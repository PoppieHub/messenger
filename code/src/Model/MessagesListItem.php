<?php

namespace App\Model;

class MessagesListItem
{
    private string $id;

    private string $body_message;

    private ?bool $is_read = null;

    private ?int $created_at = null;

    private ?int $updated_at = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getBodyMessage(): string
    {
        return $this->body_message;
    }

    public function setBodyMessage(string $body_message): self
    {
        $this->body_message = $body_message;

        return $this;
    }

    public function isIsRead(): ?bool
    {
        return $this->is_read;
    }

    public function setIsRead(?bool $is_read): self
    {
        $this->is_read = $is_read;

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
}
