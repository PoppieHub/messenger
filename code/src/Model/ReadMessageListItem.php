<?php

namespace App\Model;

class ReadMessageListItem
{
    private string $id;

    private UsersListItem $usersListItem;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

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
}
