<?php

namespace App\Model;

class ReadMessageListItem
{
    private string $id;

    private UsersListItem $user;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getUser(): UsersListItem
    {
        return $this->user;
    }

    public function setUser(UsersListItem $user): self
    {
        $this->user = $user;

        return $this;
    }
}
