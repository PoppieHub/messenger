<?php

namespace App\Model;

class ContentListResponse
{
    /**
     * @var ContentListItem[]
     */
    private array $items;

    /**
     * @param ContentListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return ContentListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
