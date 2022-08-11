<?php

namespace App\Tests\Service;

use App\Entity\Chat;
use App\Model\ChatsListItem;
use App\Model\ChatsListResponse;
use App\Repository\ChatRepository;
use App\Service\ChatService;
use App\Tests\AbstractTestCase;
use Doctrine\Common\Collections\Criteria;

class ChatServiceTest extends AbstractTestCase
{
    public function testGetChats(): void
    {
        $chat = (new Chat())->setName('Test-Name')->setDescription('Test-Description');
        $this->setEntityId($chat, 7);

        $repository = $this->createMock(ChatRepository::class);
        $repository->expects($this->once())
            ->method('findBy')
            ->with([], ['name' => Criteria::ASC ])
            ->willReturn([$chat]);

        $service = new ChatService($repository);
        $expected = new ChatsListResponse([new ChatsListItem(7, 'Test-Name', 'Test-Description')]);

        $this->assertEquals($expected, $service->getChats());
    }
}
