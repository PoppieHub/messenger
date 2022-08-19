<?php

namespace App\Model;

class UsersListItem
{
    private string $id;

    private ?string $email = null;

    private string $nickname;

    private ?bool $hide_email = null;

    private ?bool $verified = null;

    private ?ContentListResponse $content = null;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getNickname(): string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getHideEmail(): ?bool
    {
        return $this->hide_email;
    }

    public function setHideEmail(?bool $hide_email): self
    {
        $this->hide_email = $hide_email;

        return $this;
    }

    public function getVerified(): ?bool
    {
        return $this->verified;
    }

    public function setVerified(?bool $verified): self
    {
        $this->verified = $verified;

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
}
