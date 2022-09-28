<?php

namespace App\Model;

class MessagesListResponse
{
    /**
     * @var MessagesListItem[]
     */
    private ?array $items = null;

    /**
     * @param MessagesListItem[] $items
     */
    public function __construct(?array $items)
    {
        $this->items = $items;
    }

    /**
     * @return MessagesListItem[]|null
     */
    public function getItems(): ?array
    {
        return $this->items;
    }
}
