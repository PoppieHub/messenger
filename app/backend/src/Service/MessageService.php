<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Exception\CheckingException\ChatReturnException;
use App\Exception\CheckingException\MembershipReturnException;
use App\Exception\CheckingException\MessageReturnException;
use App\Exception\CheckingException\UserReturnException;
use App\Model\FindRequest;
use App\Model\MessageItem;
use App\Model\MessageRequest;
use App\Model\MessageShortRequest;
use App\Model\MessagesListItem;
use App\Model\MessagesListResponse;
use App\Model\MessagesShortListRequest;
use App\Model\UpdateMessageItem;
use App\Repository\ChatRepository;
use App\Repository\MembershipRepository;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class MessageService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ChatRepository $chatRepository,
        private MessageRepository $messageRepository,
        private MembershipRepository $membershipRepository,
        private MembershipReturnException $membershipReturnException,
        private MessageReturnException $messageReturnException,
        private UserReturnException $userReturnException,
        private ChatReturnException $chatReturnException,
        private SerializerInterface $serializer,
        private UserService $userService,
        private ContentService $contentService,
        private ReadMessageService $readMessageService
    ) {
    }

    private const timeOut = 60*60*24*7;

    private function formattingObjectToArray($formatting): array
    {
        return json_decode($this->serializer->serialize($formatting, 'json'), true);
    }

    public function updateMessage(User $user, UpdateMessageItem $updateMessageItem): MessagesListItem
    {
        $message = $this->messageRepository->findMessageById(id: $updateMessageItem->getId());

        $this->messageReturnException->checkExistsMessage($message);
        $this->userReturnException->checkForMismatchBetweenTwoUsers(
            firstUserId: $user->getId(),
            secondUserId: $message->getUser()->getId()
        );
        $this->messageReturnException->checkingExpirationOfSpecifiedTime(
            timestamp: $message->getCreatedAt()->getTimestamp(),
            timeOut: self::timeOut
        );

        $messageItem = $this->getMessage($message);
        $messageItem->getBodyMessage()->setMessage($updateMessageItem->getMessage());
        $messageItem->getBodyMessage()->setContent($updateMessageItem->getContent());

        $message->setBodyMessage(
            self::formattingObjectToArray(
                formatting: $messageItem->getBodyMessage()
            )
        );
        $message->setUpdatedAt();
        $this->em->flush();

        return $messageItem;
    }

    public function addMessage(User $currentUser, MessageRequest $messageRequest): MessagesListItem
    {
        $chat = $this->chatRepository->findChatById($messageRequest->getChat());
        $this->chatReturnException->checkExistsChat($chat);

        $membership = $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chat->getId());
        $this->membershipReturnException->checkExistsMembership($membership);

        return self::setMessage(
            user: $currentUser,
            chat: $chat,
            bodyMessage: self::formattingObjectToArray(
                formatting: $messageRequest->getBodyMessage()
            )
        );
    }

    private function setMessage(User $user, Chat $chat, array $bodyMessage): MessagesListItem
    {
        $message = (new Message())
            ->setUser($user)
            ->setChat($chat)
            ->setBodyMessage($bodyMessage)
            ->setCreatedAt();

        $this->em->persist($message);
        $this->em->flush();

        return $this->getMessage($message);
    }

    public function getFoundMessage(User $currentUser, FindRequest $searchValue): MessagesListResponse
    {
        $messages = $this->messageRepository->findMessagesByBodyMessageAndMembership(
            searchValue: $searchValue->getSearchValue(),
            userId: $currentUser->getId()
        );

        return new MessagesListResponse(array_map(
            [$this, 'getMessage'],
            $messages
        ));
    }

    public function deleteMessages(Chat $chat): void
    {
        $this->messageRepository->deleteMessagesByChatId(chatId: $chat->getId());
    }

    public function deleteCollectionMessage(User $currentUser, MessagesShortListRequest $collectionMessage): void
    {
        foreach ($collectionMessage->getItems() as $value) {
            $this->deleteMessage(user: $currentUser, messageId: $value->getId());
        }

        $this->em->flush();
    }

    public function deleteMessage(User $user, string $messageId): bool
    {
        $message = $this->messageRepository->findMessageById(id: $messageId);

        $this->messageReturnException->checkExistsMessage($message);

        if ($user->getId() !== $message->getUser()->getId()) {
            if (!$message->getChat()->isMultiChat()) {
                foreach ($message->getChat()->getMemberships()->toArray() as $value) {
                    if ($value->getUser()->getId() === $user->getId()) {
                        $this->em->remove($message);
                    }
                }
            } else {
                $this->membershipReturnException->checkEqualityOfTwoMembership(
                    firstMembershipId: $user->getId(),
                    secondMembershipId: $this->membershipRepository->findFirstMembershipByChatId(
                        chatId: $message->getChat()->getId()
                    )->getUser()->getId()
                );
                $this->em->remove($message);
            }
        } else {
            $this->em->remove($message);
        }

        return true;
    }

    public function getCollectionMessages(Chat $chat): MessagesListResponse
    {
        return new MessagesListResponse(array_map(
            [$this, 'getMessage'],
            $this->messageRepository->findMessagesByChatId($chat->getId())
        ));
    }

    public function getMessage(Message $message, bool $messageNesting = true): MessagesListItem
    {
        $messageResponse = (new MessagesListItem())
            ->setId($message->getId())
            ->setBodyMessage(self::getBodyMessage($message->getBodyMessage(), $messageNesting))
            ->setUser(
                $this->userService->getProfile(
                    user: $message->getUser()
                )
            )
            ->setRead(
                $this->readMessageService->getCollectionReadMessage(
                    $message->getReadMessages()->toArray()
                )
            )
            ->setCreatedAt($message->getCreatedAt()->getTimestamp())
            ->setUpdatedAt(
                ($message->getUpdatedAt())?$message->getUpdatedAt()->getTimestamp():null
            );

        return self::getReplyMessage($messageResponse);
    }

    private function getReplyMessage(MessagesListItem $messagesListItem): MessagesListItem
    {
        $collectionMessageId = $messagesListItem->getBodyMessage()->getReplyMessage()->getItems();
        $collectionMessage = [];

        if (!empty($collectionMessageId)) {
            foreach ($collectionMessageId as $key => $value) {
                $message = $this->messageRepository->findMessageById(id: $value->getId());
                if (!empty($message)) {
                    $collectionMessage[$key] = $this->getMessage($message, false);
                }
            }

            $messagesListItem->setReply(new MessagesListResponse($collectionMessage));
        }

        return $messagesListItem;
    }

    private function getBodyMessage(array $bodyMessage, bool $messageNesting): MessageItem
    {
        return (new MessageItem())
            ->setContent($this->contentService->getCollectionContent(
                collectionContent: (
                    !empty($bodyMessage['content']) &&
                    !empty($bodyMessage['content']['items'])
                )? $bodyMessage['content']['items']: null,
                mapMethod: 'getContentByArray'
            ))
            ->setReplyMessage(self::getCollectionShortMessages(
                collectionShortMessages: (
                    !empty($bodyMessage['replyMessage']) &&
                    !empty($bodyMessage['replyMessage']['items'])
                    && $messageNesting === true
                )? $bodyMessage['replyMessage']['items']:
                    null
            ))
            ->setMessage((!empty($bodyMessage['message']))? $bodyMessage['message']: null);
    }

    private function getCollectionShortMessages(array $collectionShortMessages = null): MessagesShortListRequest
    {
        if ($collectionShortMessages === null) {
            return new MessagesShortListRequest([]);
        }

        return new MessagesShortListRequest(
            array_map(
                [$this, 'getShortMessage'],
                $collectionShortMessages
            )
        );
    }

    private function getShortMessage(array $shortMessage): MessageShortRequest
    {
        return (new MessageShortRequest())
            ->setId($shortMessage['id']);
    }
}
