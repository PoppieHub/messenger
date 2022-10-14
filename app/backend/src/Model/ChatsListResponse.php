<?php

namespace App\Model;

class ChatsListResponse
{
    /**
     * @var ChatsListItem[]
     */
    private array $items;

    /**
     * @param ChatsListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return ChatsListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
