<?php

namespace App\Entity;

use App\Repository\ContentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Index;

#[Index(columns: ["user_id"], name: "content_idx")]
#[ORM\Entity(repositoryClass: ContentRepository::class)]
class Content
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'contents')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'cascade')]
    private User $user;

    #[ORM\ManyToOne(inversedBy: 'contents')]
    private ?Chat $chat = null;

    #[ORM\Column(length: 255, unique: true)]
    private string $link;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private ?bool $avatar = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getChat(): ?Chat
    {
        return $this->chat;
    }

    public function setChat(?Chat $chat): self
    {
        $this->chat = $chat;

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

    public function isAvatar(): ?bool
    {
        return $this->avatar;
    }

    public function setAvatar(?bool $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
