<?php

namespace App\Model;

class ContentListItem
{
    private ?MessagesListItem $message = null;

    private UsersListItem $user;

    private ?ChatsListItem $chat = null;

    private string $link;

    private ?bool $avatar = null;

    public function getUser(): UsersListItem
    {
        return $this->user;
    }

    public function setUser(UsersListItem $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getAvatar(): ?bool
    {
        return $this->avatar;
    }

    public function setAvatar(?bool $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getMessage(): ?MessagesListItem
    {
        return $this->message;
    }

    public function setMessage(?MessagesListItem $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getChat(): ?ChatsListItem
    {
        return $this->chat;
    }

    public function setChat(?ChatsListItem $chat): self
    {
        $this->chat = $chat;

        return $this;
    }
}
