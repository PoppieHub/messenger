<?php

namespace App\Model;

class UsersListItem
{
    public function __construct(private string $id)
    {
    }

    public function getId(): string
    {
        return $this->id;
    }
}
