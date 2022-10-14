<?php

namespace App\Model;

class MembershipListItem
{
    private string $id;

    private bool $notification;

    private UsersListItem $usersListItem;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function isNotification(): bool
    {
        return $this->notification;
    }

    public function setNotification(bool $notification): self
    {
        $this->notification = $notification;

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
