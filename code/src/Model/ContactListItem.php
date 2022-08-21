<?php

namespace App\Model;

class ContactListItem
{
    private string $id;

    private bool $status;

    private ?UsersListItem $to_user = null;

    private ?UsersListItem $from_user = null;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function isStatus(): bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getToUser(): ?UsersListItem
    {
        return $this->to_user;
    }

    public function setToUser(?UsersListItem $to_user): self
    {
        $this->to_user = $to_user;

        return $this;
    }

    public function getFromUser(): ?UsersListItem
    {
        return $this->from_user;
    }

    public function setFromUser(?UsersListItem $from_user): self
    {
        $this->from_user = $from_user;

        return $this;
    }
}