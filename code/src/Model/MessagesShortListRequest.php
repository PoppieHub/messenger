<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\NotBlank;

class MessagesShortListRequest
{
    /**
     * @var MessageShortRequest[]
     */
    #[NotBlank]
    private array $items;

    /**
     * @param MessageShortRequest[] $items
     */
    public function __construct(array $items)
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
