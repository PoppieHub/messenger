<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\NotBlank;

class MessageShortRequest
{
    #[NotBlank]
    private string $id;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }
}
