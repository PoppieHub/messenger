<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\Length;

class UpdateMessageItem
{
    private ?string $id = null;

    private ?ContentListResponse $content = null;

    #[Length(max: 500)]
    private ?string $message = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getContent(): ?ContentListResponse
    {
        return $this->content;
    }

    public function setContent(?ContentListResponse $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }
}
