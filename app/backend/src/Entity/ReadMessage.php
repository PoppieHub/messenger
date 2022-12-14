<?php

namespace App\Entity;

use App\Repository\ReadMessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Index;

#[Index(columns: ["user_id", "message_id"], name: "read_idx")]
#[ORM\Entity(repositoryClass: ReadMessageRepository::class)]
class ReadMessage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'readMessages')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'cascade')]
    private ?Message $message = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false, onDelete: 'cascade')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?Message
    {
        return $this->message;
    }

    public function setMessage(?Message $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
