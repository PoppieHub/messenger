<?php

namespace App\Model;

class MessagesListItem
{
    private ?string $id = null;

    private ?UsersListItem $user = null;

    private ?ReadMessageListResponse $read = null;

    private ?MessageItem $body_message = null;

    private ?MessagesListResponse $reply = null;

    private ?int $created_at = null;

    private ?int $updated_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?string $id): self
    {
        $this->id = $id;

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

    public function getCreatedAt(): ?int
    {
        return $this->created_at;
    }

    public function setCreatedAt(?int $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?int
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?int $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getUser(): ?UsersListItem
    {
        return $this->user;
    }

    public function setUser(?UsersListItem $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getRead(): ?ReadMessageListResponse
    {
        return $this->read;
    }

    public function setRead(?ReadMessageListResponse $read): self
    {
        $this->read = $read;

        return $this;
    }

    public function getReply(): ?MessagesListResponse
    {
        return $this->reply;
    }

    public function setReply(?MessagesListResponse $reply): self
    {
        $this->reply = $reply;

        return $this;
    }
}
