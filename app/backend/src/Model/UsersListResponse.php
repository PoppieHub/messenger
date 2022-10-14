<?php

namespace App\Model;

class UsersListResponse
{
    /**
     * @var UsersListItem[]
     */
    private array $items;

    /**
     * @param UsersListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return UsersListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}