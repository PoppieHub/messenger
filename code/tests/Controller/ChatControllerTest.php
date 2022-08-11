<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ChatControllerTest extends WebTestCase
{
    public function testChats(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/v1/chats/');
        $responseContent = $client->getResponse()->getContent();

        $this->assertResponseIsSuccessful();

        $this->assertJsonStringEqualsJsonFile(
            __DIR__.'/responses/ChatControllerTest_testChats.json',
            $responseContent
        );
    }
}
