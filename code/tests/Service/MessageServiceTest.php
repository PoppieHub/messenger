<?php

namespace App\Tests\Service;

use App\Entity\Chat;
use App\Entity\Message;
use App\Exception\ChatNotFoundException;
use App\Model\MessagesListItem;
use App\Model\MessagesListResponse;
use App\Repository\ChatRepository;
use App\Repository\MessageRepository;
use App\Service\MessageService;
use App\Tests\AbstractTestCase;
use DateTime;

class MessageServiceTest extends AbstractTestCase
{
    public function testGetMessagesByChatNotFound(): void
    {
        $messageRepository = $this->createMock(MessageRepository::class);
        $chatRepository = $this->createMock(ChatRepository::class);

        $chatRepository->expects($this->once())
            ->method('existsById')
            ->with(10000)
            ->willReturn(false);

        $this->expectException(ChatNotFoundException::class);

        (new MessageService($chatRepository, $messageRepository))->getCollectionMessages(10000);
    }

    public function testGetMessagesByChat(): void
    {
        $messageRepository = $this->createMock(MessageRepository::class);
        $messageRepository->expects($this->once())
            ->method('findMessagesByChatId')
            ->with(10000)
            ->willReturn([$this->createMessageEntity()]);

        $chatRepository = $this->createMock(ChatRepository::class);
        $chatRepository->expects($this->once())
            ->method('existsById')
            ->with(10000)
            ->willReturn(true);

        $service = new MessageService($chatRepository, $messageRepository);

        $expected = new MessagesListResponse([$this->createMessageItemModel()]);

        $this->assertEquals($expected, $service->getCollectionMessages(10000));
    }

    private function createMessageEntity(): Message
    {
        $message = (new Message())
            ->setBodyMessage('Test-message')
            ->setIsRead(false)
            ->setCreatedAt();

        $this->setEntityId($message, 190);

        return $message;
    }

    private function createMessageItemModel(): MessagesListItem
    {
        return (new MessagesListItem())
            ->setId(190)
            ->setBodyMessage('Test-message')
            ->setIsRead(false)
            ->setCreatedAt((new DateTime())->getTimestamp())
            ->setUpdatedAt(null);
    }
}
