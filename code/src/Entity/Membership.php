<?php

namespace App\Entity;

use App\Repository\MembershipRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MembershipRepository::class)]
class Membership
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\Column]
    private ?bool $notification = null;

    #[ORM\ManyToOne(inversedBy: 'memberships')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Chat $chat_id = null;

    #[ORM\ManyToOne(inversedBy: 'membership')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isNotification(): ?bool
    {
        return $this->notification;
    }

    public function setNotification(bool $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    public function getChat(): ?Chat
    {
        return $this->chat_id;
    }

    public function setChat(?Chat $chat_id): self
    {
        $this->chat_id = $chat_id;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user_id;
    }

    public function setUser(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }
}
