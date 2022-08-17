<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\UserAlreadyExistsException;
use App\Model\ProfileRequest;
use App\Model\UsersListItem;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private UserPasswordHasherInterface $hasher,
        private UserRepository $userRepository,
        private EntityManagerInterface $em)
    {
    }

    public function getProfile(User $user): UsersListItem
    {
        return (new UsersListItem())
            ->setEmail($user->getEmail())
            ->setNickname($user->getNickname())
            ->setHideEmail($user->isHideEmail())
            ->setVerified($user->isVerified());
    }

    public function changeProfile(User $user, ProfileRequest $profile): UsersListItem
    {
        if ($profile->getNickname() !== null) {
            if ($this->userRepository->existsByNickname($profile->getNickname()) ||
                $user->getNickname() === $profile->getNickname()) {
                throw new UserAlreadyExistsException();
            }

            $user->setNickname($profile->getNickname());
        }

        if ($profile->getPassword() !== null) {
            $user->setPassword($this->hasher->hashPassword($user, $profile->getPassword()));
        }

        if ($profile->getHideEmail() !== null) {
            $user->setHideEmail($profile->getHideEmail());
        }

        $this->em->flush();

        return $this->getProfile($user);
    }
}
