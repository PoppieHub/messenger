<?php

namespace App\Tests\Controller;

use App\Entity\Chat;
use App\Tests\AbstractControllerTest;

class ChatControllerTest extends AbstractControllerTest
{
    public function testChats(): void
    {
        $this->em->persist(
            (new Chat())
            ->setName('Test-ChatController')
            ->setDescription('Test for ChatController')
        );
        $this->em->flush();

        $this->client->request('GET', '/api/v1/chats/');
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
                        'required' => [
                            'id',
                            'name',
                            'description'
                        ],
                        'properties' => [
                            'id' => ['type' => 'integer'],
                            'name' => ['type' => 'string'],
                            'description' => ['type' => 'string']
                        ]
                    ]
                ]
            ]
        ]);
    }
}
