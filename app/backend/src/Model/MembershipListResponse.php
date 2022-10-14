<?php

namespace App\Model;

class MembershipListResponse
{
    /**
     * @var MembershipListItem[]
     */
    private array $items;

    /**
     * @param MembershipListItem[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return MembershipListItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
