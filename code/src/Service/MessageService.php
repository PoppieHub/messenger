<?php

namespace App\Service;

use App\Entity\Message;
use App\Exception\ChatNotFoundException;
use App\Model\MessagesListItem;
use App\Model\MessagesListResponse;
use App\Repository\ChatRepository;
use App\Repository\MessageRepository;

class MessageService
{
    public function __construct(private ChatRepository $chatRepository, private MessageRepository $messageRepository)
    {
    }

    public function getMessagesByChat(string $chatId): MessagesListResponse
    {
        if (!$this->chatRepository->existsById($chatId)) {
            throw new ChatNotFoundException();
        }

        return new MessagesListResponse(array_map(
            [$this, 'map'],
            $this->messageRepository->findMessagesByChatId($chatId)
        ));
    }

    private function map(Message $message): MessagesListItem
    {
        return (new MessagesListItem())
            ->setId($message->getId())
            ->setBodyMessage($message->getBodyMessage())
            ->setIsRead($message->isIsRead())
            ->setCreatedAt($message->getCreatedAt()->getTimestamp())
            ->setUpdatedAt(
                ($message->getUpdatedAt())?$message->getUpdatedAt()->getTimestamp():$message->getUpdatedAt()
            );
    }
}
