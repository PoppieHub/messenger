<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\NotBlank;

class MessagesListRequest
{
    /**
     * @var MessageRequest[]
     */
    #[NotBlank]
    private array $items;

    /**
     * @param MessageRequest[] $items
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }

    /**
     * @return MessageRequest[]
     */
    public function getItems(): array
    {
        return $this->items;
    }
}
