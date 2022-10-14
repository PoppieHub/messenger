<?php

namespace App\Model;

class ReadMessageListResponse
{
    /**
     * @var ReadMessageListItem[]
     */
    private array $items;

    /**
     * @param ReadMessageListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return ReadMessageListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
