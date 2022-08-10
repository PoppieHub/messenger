<?php

namespace App\Entity;

use App\Repository\ContactRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\Column(nullable: false, options: ['default' => false])]
    private bool $status;

    #[ORM\ManyToOne(inversedBy: 'to_user_contact')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $to_user = null;

    #[ORM\ManyToOne(inversedBy: 'from_user_contact')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $from_user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isStatus(): bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getToUser(): ?User
    {
        return $this->to_user;
    }

    public function setToUser(?User $to_user): self
    {
        $this->to_user = $to_user;

        return $this;
    }

    public function getFromUser(): ?User
    {
        return $this->from_user;
    }

    public function setFromUser(?User $from_user): self
    {
        $this->from_user = $from_user;

        return $this;
    }
}
