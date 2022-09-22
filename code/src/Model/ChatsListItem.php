<?php

namespace App\Model;

class ChatsListItem
{
    private string $id;

    private string $name;

    private ?string $description;

    private bool $multiChat;

    private ?ContentListResponse $content = null;

    private ?MembershipListResponse $membership = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function isMultiChat(): bool
    {
        return $this->multiChat;
    }

    public function setMultiChat(bool $multiChat): self
    {
        $this->multiChat = $multiChat;

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

    public function getMembership(): ?MembershipListResponse
    {
        return $this->membership;
    }

    public function setMembership(?MembershipListResponse $membership): self
    {
        $this->membership = $membership;

        return $this;
    }
}
