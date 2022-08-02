<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

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

    #[ORM\Column(type: 'boolean', nullable: false)]
    private bool $hide_email;

    #[ORM\Column(type: 'boolean', nullable: false)]
    private bool $verified;

    #[ORM\OneToMany(mappedBy: 'to_user', targetEntity: Contact::class)]
    private Collection $to_user_contact;

    #[ORM\OneToMany(mappedBy: 'from_user', targetEntity: Contact::class)]
    private Collection $from_user_contact;

    public function __construct()
    {
        $this->to_user_contact = new ArrayCollection();
        $this->from_user_contact = new ArrayCollection();
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

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getNickname(): string
    {
        return $this->nickname;
    }

    public function setNickname(string $nickname): void
    {
        $this->nickname = $nickname;
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

    public function setHideEmail(bool $hide_email): void
    {
        $this->hide_email = $hide_email;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): void
    {
        $this->verified = $verified;
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
            $toUserContact->addToUser($this);
        }

        return $this;
    }

    public function removeToUserContact(Contact $toUserContact): self
    {
        if ($this->to_user_contact->removeElement($toUserContact)) {
            $toUserContact->removeToUser($this);
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
            $fromUserContact->addToUser($this);
        }

        return $this;
    }

    public function removeFromUserContact(Contact $fromUserContact): self
    {
        if ($this->from_user_contact->removeElement($fromUserContact)) {
            $fromUserContact->removeToUser($this);
        }

        return $this;
    }

}
