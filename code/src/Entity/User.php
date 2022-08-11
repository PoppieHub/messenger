<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Table(name: '`user`')]
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?string $id = null;

    #[ORM\Column(type: 'string', length: '128', unique: true, nullable: false)]
    private string $email;

    #[ORM\Column(type: 'string', length: '30', unique: true, nullable: false)]
    private string $nickname;

    #[ORM\Column(type: 'string', nullable: false)]
    private string $password;

    #[ORM\Column(type: 'boolean', nullable: false, options: ['default' => false])]
    private bool $hide_email;

    #[ORM\Column(type: 'boolean', nullable: false, options: ['default' => false])]
    private bool $verified;

    #[ORM\OneToMany(mappedBy: 'to_user', targetEntity: Contact::class)]
    private Collection $to_user_contact;

    #[ORM\OneToMany(mappedBy: 'from_user', targetEntity: Contact::class)]
    private Collection $from_user_contact;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Membership::class)]
    private Collection $membership;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Message::class)]
    private Collection $messages;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Content::class)]
    private Collection $contents;

    public function __construct()
    {
        $this->to_user_contact = new ArrayCollection();
        $this->from_user_contact = new ArrayCollection();
        $this->membership = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->contents = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getRoles(): array
    {
        return [];
    }

    public function eraseCredentials(): void
    {
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
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

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function isHideEmail(): bool
    {
        return $this->hide_email;
    }

    public function setHideEmail(bool $hide_email): self
    {
        $this->hide_email = $hide_email;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getToUserContact(): Collection
    {
        return $this->to_user_contact;
    }

    public function addToUserContact(Contact $toUserContact): self
    {
        if (!$this->to_user_contact->contains($toUserContact)) {
            $this->to_user_contact->add($toUserContact);
            $toUserContact->setToUser($this);
        }

        return $this;
    }

    public function removeToUserContact(Contact $toUserContact): self
    {
        if ($this->to_user_contact->removeElement($toUserContact)) {
            // set the owning side to null (unless already changed)
            if ($toUserContact->getToUser() === $this) {
                $toUserContact->setToUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getFromUserContact(): Collection
    {
        return $this->from_user_contact;
    }

    public function addFromUserContact(Contact $fromUserContact): self
    {
        if (!$this->from_user_contact->contains($fromUserContact)) {
            $this->from_user_contact->add($fromUserContact);
            $fromUserContact->setFromUser($this);
        }

        return $this;
    }

    public function removeFromUserContact(Contact $fromUserContact): self
    {
        if ($this->from_user_contact->removeElement($fromUserContact)) {
            // set the owning side to null (unless already changed)
            if ($fromUserContact->getFromUser() === $this) {
                $fromUserContact->setFromUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Membership>
     */
    public function getMembership(): Collection
    {
        return $this->membership;
    }

    public function addMembership(Membership $membership): self
    {
        if (!$this->membership->contains($membership)) {
            $this->membership->add($membership);
            $membership->setUser($this);
        }

        return $this;
    }

    public function removeMembership(Membership $membership): self
    {
        if ($this->membership->removeElement($membership)) {
            // set the owning side to null (unless already changed)
            if ($membership->getUser() === $this) {
                $membership->setUser(null);
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
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
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
            $content->setUser($this);
        }

        return $this;
    }

    public function removeContent(Content $content): self
    {
        if ($this->contents->removeElement($content)) {
            // set the owning side to null (unless already changed)
            if ($content->getUser() === $this) {
                $content->setUser(null);
            }
        }

        return $this;
    }
}
