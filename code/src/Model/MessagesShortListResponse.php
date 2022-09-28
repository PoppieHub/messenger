<?php

namespace App\Model;

class MessagesShortListResponse
{
    /**
     * @var MessageShortRequest[]|null
     */
    private ?array $items = null;

    /**
     * @param MessageShortRequest[]|null $items
     */
    public function __construct(?array $items)
    {
        $this->items = $items;
    }

    /**
     * @return MessageShortRequest[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
