<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints\EqualTo;
use Symfony\Component\Validator\Constraints\Length;

class ProfileRequest
{
    #[Length(max: 30)]
    private ?string $nickname = null;

    #[Length(min: 2, max: 30)]
    private ?string $firstName = null;

    #[Length(min: 2, max: 30)]
    private ?string $lastName = null;

    #[Length(min: 8)]
    private ?string $password = null;

    #[EqualTo(propertyPath: 'password', message: 'This value should be equal to password field')]
    private ?string $confirmPassword = null;

    private ?bool $hide_email = null;

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(?string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getConfirmPassword(): ?string
    {
        return $this->confirmPassword;
    }

    public function setConfirmPassword(?string $confirmPassword): self
    {
        $this->confirmPassword = $confirmPassword;

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
}
