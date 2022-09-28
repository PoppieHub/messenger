<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'cascade')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'cascade')]
    private ?Chat $chat = null;

    #[ORM\Column(type: Types::JSON, nullable: false)]
    private ?array $body_message = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: false)]
    private \DateTimeInterface $created_at;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\OneToMany(mappedBy: 'message', targetEntity: ReadMessage::class, orphanRemoval: true)]
    private Collection $readMessages;

    public function __construct()
    {
        $this->readMessages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getChat(): ?Chat
    {
        return $this->chat;
    }

    public function setChat(?Chat $chat): self
    {
        $this->chat = $chat;

        return $this;
    }

    public function getBodyMessage(): ?array
    {
        return $this->body_message;
    }

    public function setBodyMessage(?array $body_message): self
    {
        $this->body_message = $body_message;

        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(): self
    {
        $this->created_at = new \DateTime();

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(): self
    {
        $this->updated_at = new \DateTime();

        return $this;
    }

    /**
     * @return Collection<int, ReadMessage>
     */
    public function getReadMessages(): Collection
    {
        return $this->readMessages;
    }

    public function addReadMessage(ReadMessage $readMessage): self
    {
        if (!$this->readMessages->contains($readMessage)) {
            $this->readMessages->add($readMessage);
            $readMessage->setMessage($this);
        }

        return $this;
    }

    public function removeReadMessage(ReadMessage $readMessage): self
    {
        if ($this->readMessages->removeElement($readMessage)) {
            // set the owning side to null (unless already changed)
            if ($readMessage->getMessage() === $this) {
                $readMessage->setMessage(null);
            }
        }

        return $this;
    }
}
