<?php

namespace App\Model;

class MessagesListItem
{
    private string $id;

    private UsersListItem $usersListItem;

    private ChatsListItem $chatsListItem;

    private ReadMessageListResponse $readMessageListResponse;

    private string $body_message;

    private int $created_at;

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

    public function getCreatedAt(): int
    {
        return $this->created_at;
    }

    public function setCreatedAt(int $created_at): self
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

    public function getUsersListItem(): UsersListItem
    {
        return $this->usersListItem;
    }

    public function setUsersListItem(UsersListItem $usersListItem): self
    {
        $this->usersListItem = $usersListItem;

        return $this;
    }

    public function getChatsListItem(): ChatsListItem
    {
        return $this->chatsListItem;
    }

    public function setChatsListItem(ChatsListItem $chatsListItem): self
    {
        $this->chatsListItem = $chatsListItem;

        return $this;
    }

    public function getReadMessageListResponse(): ReadMessageListResponse
    {
        return $this->readMessageListResponse;
    }

    public function setReadMessageListResponse(ReadMessageListResponse $readMessageListResponse): self
    {
        $this->readMessageListResponse = $readMessageListResponse;

        return $this;
    }
}
