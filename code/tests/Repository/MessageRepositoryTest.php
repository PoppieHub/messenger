<?php

namespace App\Tests\Repository;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\MessageRepository;
use App\Tests\AbstractRepositoryTest;

class MessageRepositoryTest extends AbstractRepositoryTest
{
    private MessageRepository $messageRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->messageRepository = $this->getRepositoryForEntity(Message::class);
    }

    public function testFindMessagesByChatId()
    {
        $chat = (new Chat())->setName('Test-for-test')->setDescription('Test-for-test description');
        $this->em->persist($chat);

        for ($i = 0; $i < 5; $i++) {
            $user = $this->createUser('user'.$i);
            $this->em->persist($user);
            $message = $this->createMessage('message'.$i, $chat, $user);
            $this->em->persist($message);
        }

        $this->em->flush();

        $this->assertCount(5, $this->messageRepository->findMessagesByChatId($chat->getId()));
    }

    private function createUser(string $salt): User
    {
        return (new User())
            ->setEmail($salt.'@'.$salt)
            ->setVerified(true)
            ->setHideEmail(false)
            ->setNickname($salt)
            ->setPassword($salt);
    }

    private function createMessage(string $message, Chat $chat, User $user): Message
    {
        return (new Message())
            ->setCreatedAt()
            ->setIsRead(false)
            ->setBodyMessage($message)
            ->setChat($chat)
            ->setUser($user);
    }
}
