<?php

namespace App\Model;

class ContentListResponse
{
    /**
     * @var ContentListItem[]|null
     */
    private ?array $items = null;

    /**
     * @param ContentListItem[]|null $items
     */
    public function __construct(?array $items)
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
