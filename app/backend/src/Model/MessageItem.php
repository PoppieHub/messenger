<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\Length;

class MessageItem
{
    private ?ContentListResponse $content = null;

    #[Length(max: 500)]
    private ?string $message = null;

    private ?MessagesShortListRequest $replyMessage = null;

    public function getContent(): ?ContentListResponse
    {
        return $this->content;
    }

    public function setContent(?ContentListResponse $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getReplyMessage(): ?MessagesShortListRequest
    {
        return $this->replyMessage;
    }

    public function setReplyMessage(?MessagesShortListRequest $replyMessage): self
    {
        $this->replyMessage = $replyMessage;

        return $this;
    }
}
