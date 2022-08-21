<?php

namespace App\Model;

class ContactListResponse
{
    /**
     * @var ContactListItem[]
     */
    private array $items;

    /**
     * @param ContactListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return ContactListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}