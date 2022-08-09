<?php

namespace App\Tests\Service;

use App\Entity\Chat;
use App\Model\ChatsListItem;
use App\Model\ChatsListResponse;
use App\Repository\ChatRepository;
use App\Service\ChatService;
use Doctrine\Common\Collections\Criteria;
use PHPUnit\Framework\TestCase;

class ChatServiceTest extends TestCase
{

    public function testGetChats(): void
    {
        $repository = $this->createMock(ChatRepository::class);
        $repository->expects($this->once())
            ->method('findBy')
            ->with([],['name' => Criteria::ASC ])
            ->willReturn([(new Chat())->setId(7 )->setName('Test-Name')->setDescription('Test-Description')]);

        $service = new ChatService($repository);
        $expected = new ChatsListResponse([new ChatsListItem(7, 'Test-Name', 'Test-Description')]);

        $this->assertEquals($expected, $service->getChats());
    }
}
