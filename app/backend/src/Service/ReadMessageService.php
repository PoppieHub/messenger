<?php

namespace App\Service;

use App\Entity\Message;
use App\Entity\ReadMessage;
use App\Entity\User;
use App\Model\MessagesShortListRequest;
use App\Model\ReadMessageListItem;
use App\Model\ReadMessageListResponse;
use App\Repository\MessageRepository;
use App\Repository\ReadMessageRepository;
use Doctrine\ORM\EntityManagerInterface;

class ReadMessageService
{
    public function __construct(
        private UserService $userService,
        private EntityManagerInterface $em,
        private MessageRepository $messageRepository,
        private ReadMessageRepository $readMessageRepository
    ) {
    }

    public function deleteCollectionReadMessage(User $currentUser, MessagesShortListRequest $collectionMessage): void
    {
        foreach ($collectionMessage->getItems() as $value) {
            $this->readMessageRepository->deleteRead(
                userId: $currentUser->getId(),
                messageId: $value->getId()
            );
        }
    }

    public function addReadMessage(User $currentUser, MessagesShortListRequest $collectionMessage): void
    {
        $count = 0;

        foreach ($collectionMessage->getItems() as $value) {
            $message = $this->messageRepository->findMessageById($value->getId());

            if (!empty($message)) {
                $existingRead = $this->readMessageRepository->existsReadMessage(userId: $currentUser->getId(), messageId: $message->getId());
                $userMessage = $message->getUser()->getId();

                if (empty($existingRead) && $userMessage !== $currentUser->getId()) {
                    $this->setReadMessage(currentUser: $currentUser, message: $message);
                    $count++;
                }
            }
        }

        if ($count > 0) {
            $this->em->flush();
        }
    }

    private function setReadMessage(User $currentUser, Message $message): void
    {
        $readMessage = (new ReadMessage())
            ->setUser($currentUser)
            ->setMessage($message);

        $this->em->persist($readMessage);
    }

    public function getCollectionReadMessage(array $collectionMessage = null): ReadMessageListResponse
    {
        if ($collectionMessage === null) {
            return $collectionMessage;
        }

        return new ReadMessageListResponse(array_map(
            [$this, 'getReadMessage'],
            $collectionMessage
        ));
    }

    public function getReadMessage(ReadMessage $readMessage): ReadMessageListItem
    {
        return (new ReadMessageListItem())
            ->setId($readMessage->getId())
            ->setUser(
                $this->userService->getProfile(user: $readMessage->getUser())
            );
    }
}
