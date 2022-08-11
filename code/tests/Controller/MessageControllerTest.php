<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MessageControllerTest extends WebTestCase
{

    public function testMessagesByChat(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/v1/chat/1/messages/');
        $responseContent = $client->getResponse()->getContent();

        $this->assertResponseIsSuccessful();

        $this->assertJsonStringEqualsJsonFile(
            __DIR__.'/responses/MessageControllerTest_testMessagesByChat.json',
            $responseContent
        );
    }
}
