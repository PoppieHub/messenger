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

    #[ORM\Column(nullable: false, options: ['default' => false])]
    private bool $multiChat;

    #[ORM\OneToMany(mappedBy: 'chat', targetEntity: Membership::class)]
    private Collection $memberships;

    #[ORM\OneToMany(mappedBy: 'chat', targetEntity: Message::class)]
    private Collection $messages;

    #[ORM\OneToMany(mappedBy: 'chat', targetEntity: Content::class)]
    private Collection $contents;

    public function __construct()
    {
        $this->memberships = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->contents = new ArrayCollection();
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

    public function isMultiChat(): bool
    {
        return $this->multiChat;
    }

    public function setMultiChat(bool $multiChat): self
    {
        $this->multiChat = $multiChat;

        return $this;
    }

    /**
     * @return Collection<int, Membership>
     */
    public function getMemberships(): Collection
    {
        return $this->memberships;
    }

    public function addMemberships(Membership $memberships): self
    {
        if (!$this->memberships->contains($memberships)) {
            $this->memberships->add($memberships);
            $memberships->setChat($this);
        }

        return $this;
    }

    public function removeMemberships(Membership $memberships): self
    {
        if ($this->memberships->removeElement($memberships)) {
            // set the owning side to null (unless already changed)
            if ($memberships->getChat() === $this) {
                $memberships->setChat(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setChat($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getChat() === $this) {
                $message->setChat(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Content>
     */
    public function getContents(): Collection
    {
        return $this->contents;
    }

    public function addContent(Content $content): self
    {
        if (!$this->contents->contains($content)) {
            $this->contents->add($content);
            $content->setChat($this);
        }

        return $this;
    }

    public function removeContent(Content $content): self
    {
        if ($this->contents->removeElement($content)) {
            // set the owning side to null (unless already changed)
            if ($content->getChat() === $this) {
                $content->setChat(null);
            }
        }

        return $this;
    }
}
