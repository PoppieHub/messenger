<?php

namespace App\Exception\CheckingException;

use App\Entity\User;
use App\Exception\UserAlreadyExistsException;
use App\Exception\UserNotFoundException;
use App\Repository\UserRepository;

class UserReturnException
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function checkUserOnEmpty(User|null $user): void
    {
        if (empty($user)) {
            throw new UserNotFoundException();
        }
    }

    public function checkUserExistenceOnNickname(string $nickname): void
    {
        if ($this->userRepository->existsByNickname($nickname)) {
            throw new UserAlreadyExistsException();
        }
    }

    public function checkingForTheCoincidenceOfTwoUniqueParameters(string $firstParameter, string $secondParameter): void
    {
        if ($firstParameter === $secondParameter) {
            throw new UserAlreadyExistsException();
        }
    }

    public function checkUserExistenceOnNicknameAndEmail(string $nickname, string $email): void
    {
        if ($this->userRepository->existsByEmail($email) &&
            $this->userRepository->existsByNickname($nickname)) {
            throw new UserAlreadyExistsException();
        }
    }
}
