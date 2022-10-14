<?php

namespace App\Model;

class MessageRequest
{
    private ?string $chat = null;

    private ?MessageItem $body_message = null;

    public function getChat(): ?string
    {
        return $this->chat;
    }

    public function setChat(?string $chat): self
    {
        $this->chat = $chat;

        return $this;
    }

    public function getBodyMessage(): ?MessageItem
    {
        return $this->body_message;
    }

    public function setBodyMessage(?MessageItem $body_message): self
    {
        $this->body_message = $body_message;

        return $this;
    }
}
