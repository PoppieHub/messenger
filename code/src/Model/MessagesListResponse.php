<?php

namespace App\Model;

class MessagesListResponse
{
    /**
     * @var MessagesListItem[]
     */
    private array $items;

    /**
     * @param MessagesListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return MessagesListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
