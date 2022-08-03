<?php

namespace App\Entity;

use App\Repository\ChatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChatRepository::class)]
class Chat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\Column(length: 128)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'chat_id', targetEntity: Membership::class)]
    private Collection $chat_id_membership;

    public function __construct()
    {
        $this->chat_id_membership = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Membership>
     */
    public function getChatIdMembership(): Collection
    {
        return $this->chat_id_membership;
    }

    public function addChatIdMembership(Membership $chatIdMembership): self
    {
        if (!$this->chat_id_membership->contains($chatIdMembership)) {
            $this->chat_id_membership->add($chatIdMembership);
            $chatIdMembership->setChatId($this);
        }

        return $this;
    }

    public function removeChatIdMembership(Membership $chatIdMembership): self
    {
        if ($this->chat_id_membership->removeElement($chatIdMembership)) {
            // set the owning side to null (unless already changed)
            if ($chatIdMembership->getChatId() === $this) {
                $chatIdMembership->setChatId(null);
            }
        }

        return $this;
    }
}
