<?php

namespace App\Model;

class ContentListItem
{
    private ?string $id = null;

    private string $link;

    private ?bool $avatar = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getAvatar(): ?bool
    {
        return $this->avatar;
    }

    public function setAvatar(?bool $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
