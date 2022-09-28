<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\User;
use App\Exception\CheckingException\ChatReturnException;
use App\Exception\CheckingException\MembershipReturnException;
use App\Exception\CheckingException\UserReturnException;
use App\Model\ChatsListItem;
use App\Model\ChatsListResponse;
use App\Model\ContentListItem;
use App\Model\MessagesListItem;
use App\Model\MessagesListResponse;
use App\Repository\ChatRepository;
use App\Repository\ContentRepository;
use App\Repository\MembershipRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ChatService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ChatRepository $chatRepository,
        private UserReturnException $userReturnException,
        private ContentService $contentService,
        private MembershipService $membershipService,
        private MessageService $messageService,
        private ContentRepository $contentRepository,
        private ChatReturnException $chatReturnException,
        private MembershipReturnException $membershipReturnException,
        private MembershipRepository $membershipRepository,
        private UserRepository $userRepository
    ) {
    }

    public function getDefaultChat(User $currentUser, string $otherUserId): ChatsListItem
    {
        $chat = $this->chatRepository->findChatOfTwoUsers(firstUserId: $currentUser->getId(), secondUserId: $otherUserId, multiChat: false);

        if ($chat === null) {
            $otherUser = $this->userRepository->findUserById($otherUserId);

            $this->userReturnException->checkUserOnEmpty($otherUser);

            $chat = $this->createChat();

            $this->membershipService->setMembershipForChat(userWhoIsChatting: $currentUser, addedUser: $currentUser, chat: $chat, isNewChat: true);
            $this->membershipService->setMembershipForChat(userWhoIsChatting: $otherUser, addedUser: $otherUser, chat: $chat, isNewChat: true);
        }

        return $this->getChat(chat: $chat, currentUser: $currentUser);
    }

    public function getListChats(User $user): ChatsListResponse
    {
        $this->userReturnException->checkUserOnEmpty(user: $user);

        return $this->getCollectionChats(
            collectionChats: $this->chatRepository->getChatsForUser($user->getId()),
            currentUser: $user
        );
    }

    public function createMultiChat(User $currentUser, string $name, string $description = null): ChatsListItem
    {
        $chat = $this->createChat(name: $name, description: $description, multiChat: true);

        $this->membershipService->setMembershipForChat(userWhoIsChatting: $currentUser, addedUser: $currentUser, chat: $chat, isNewChat: true);

        return $this->getChat(chat: $chat, currentUser: $currentUser);
    }

    public function updateMultiChat(User $currentUser, string $chatId, string $name = null, string $description = null): ChatsListItem
    {
        $chat = $this->chatRepository->findChatById($chatId);

        $this->chatReturnException->checkExistsChat($chat);
        $this->chatReturnException->checkNotIsChatMulti($chat);
        $this->membershipReturnException->checkExistsMembership(
            $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chat->getId())
        );

        if (!empty($name)) {
            $chat->setName($name);
        }
        if (!empty($description !== null)) {
            $chat->setDescription($description);
        }

        $this->em->flush();

        return $this->getChat($chat, $currentUser);
    }

    public function createChat(string $name = 'Default Chat', string $description = null, bool $multiChat = false): Chat
    {
        $chat = (new Chat())
            ->setName($name)
            ->setDescription($description)
            ->setMultiChat($multiChat);

        $this->em->persist($chat);
        $this->em->flush();

        return $chat;
    }

    public function uploadAvatar(User $user, UploadedFile $file, string $chatId): ContentListItem
    {
        $chat = $this->chatRepository->findChatById($chatId);

        return $this->contentService->uploadFileForContent(user: $user, file: $file, avatarValue: true, chat: $chat);
    }

    public function deleteChat(User $currentUser, string $chatId): bool
    {
        $chat = $this->chatRepository->findChatById($chatId);
        $this->chatReturnException->checkExistsChat($chat);

        if ($chat->isMultiChat()) {
            $this->membershipReturnException->checkEqualityOfTwoMembership(
                firstMembershipId: $currentUser->getId(),
                secondMembershipId: $this->membershipRepository->findFirstMembershipByChatId(
                    chatId: $chat->getId()
                )->getUser()->getId()
            );
        } else {
            $this->membershipReturnException->checkExistsMembership(
                $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chatId)
            );
        }

        $this->messageService->deleteMessages(chat: $chat);
        $this->membershipService->deleteMemberships(chat: $chat);

        $this->em->remove($chat);
        $this->em->flush();

        return true;
    }

    public function getCollectionChats(array $collectionChats, User $currentUser): ChatsListResponse
    {
        return new ChatsListResponse(array_map(
            fn (Chat $chat) => $this->getChat(chat: $chat, currentUser: $currentUser),
            $collectionChats
        ));
    }

    public function getChat(Chat $chat, User $currentUser): ChatsListItem
    {
        $chatListItem =  (new ChatsListItem())
            ->setId($chat->getId())
            ->setName($chat->getName())
            ->setDescription($chat->getDescription())
            ->setMultiChat($chat->isMultiChat())
            ->setMembership(
                (!empty($chat->getMemberships()))?
                    $this->membershipService->getCollectionMembership(
                        $chat->getMemberships()->toArray()
                    ) : null
            )
            ->setContent(
                $this->contentService->getCollectionContent(
                    $this->contentRepository->getContentsForChat(
                        chatId: $chat->getId(),
                        avatar: true
                    )
                )
            )
            ->setMessages(
                $this->messageService->getCollectionMessages($chat)
            );

        $messages = $chatListItem->getMessages()->getItems();
        $chatListItem->setLastMessage(
            (!empty($messages))? $messages[array_key_last($messages)]: null
        );

        $chatListItem->setUnreadMessageCounter(
            self::unreadMessageCounter(currentUser: $currentUser, messagesListResponse: $chatListItem->getMessages())
        );

        return $chatListItem;
    }

    private function unreadMessageCounter(User $currentUser, MessagesListResponse $messagesListResponse): ?int
    {
        $totalCount = 0;

        foreach ($messagesListResponse->getItems() as $value) {
            if (!empty($value)) {
                $messageUserId = $value->getUser()->getId();

                if ($currentUser->getId() !== $messageUserId) {
                    $totalCount++;

                    foreach ($value->getRead()->getItems() as $item) {
                        if (!empty($item)) {
                            if ($item->getUser()->getId() === $currentUser->getId()) {
                                $totalCount--;
                                break;
                            }
                        }
                    }
                }
            }
        }

        return $totalCount;
    }
}
