<?php

namespace App\Tests\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Tests\AbstractControllerTest;

class MessageControllerTest extends AbstractControllerTest
{

    public function testMessagesByChat(): void
    {
        $chatId = $this->createMessage($this->createUser(), $this->createChat())
            ->getChat()
            ->getId();

        $this->client->request('GET', '/api/v1/chat/'.$chatId.'/messages/');
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertResponseIsSuccessful();
        $this->assertJsonDocumentMatchesSchema($responseContent, [
            'type' => 'object',
            'required' => ['items'],
            'properties' => [
                'items' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'required' => ['id', 'bodyMessage', 'isRead', 'createdAt', 'updatedAt'],
                        'properties' => [
                            'id' => ['type' => 'integer'],
                            'bodyMessage' => ['type' => 'string'],
                            'isRead' => ['type' => 'boolean'],
                            'createdAt' => ['type' => 'integer'],
                            'updatedAt' => ['type' => 'integer']
                        ]
                    ]
                ]
            ]
        ]);
    }

    private function createChat(): Chat
    {
        $chat = (new Chat())
            ->setName('Test-MessageController'.rand(0, 100))
            ->setDescription('Test for MessageController'.rand(0, 100));
        $this->em->persist($chat);

        $this->em->flush();

        return $chat;
    }

    private function createUser(string $salt = 'UserForTest'): User
    {
        $user = (new User())
            ->setEmail($salt.rand(0, 100).'@'.$salt.rand(0, 100))
            ->setVerified(true)
            ->setHideEmail(false)
            ->setNickname($salt.rand(0, 100))
            ->setPassword($salt);
        $this->em->persist($user);

        $this->em->flush();

        return $user;
    }

    public function createMessage(User $user, Chat $chat): Message
    {
        $message = (new Message())
            ->setUser($user)
            ->setChat($chat)
            ->setBodyMessage('MessageForTest'.rand(0, 100))
            ->setIsRead(false)
            ->setCreatedAt()
            ->setUpdatedAt();
        $this->em->persist($message);

        $this->em->flush();

        return $message;
    }
}
