<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\UserAlreadyExistsException;
use App\Model\UsersListItem;
use App\Model\SignUpRequest;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityService
{
    public function __construct(private UserPasswordHasherInterface $hasher, private UserRepository $userRepository, private EntityManagerInterface $em)
    {
    }

    public function signUp(SignUpRequest $signUpRequest): UsersListItem
    {
        if ($this->userRepository->existsByEmail($signUpRequest->getEmail())) {
            throw new UserAlreadyExistsException();
        }

        $user = (new User())
            ->setEmail($signUpRequest->getEmail())
            ->setHideEmail(false)
            ->setNickname($signUpRequest->getNickname())
            ->setVerified(false);

        $user->setPassword($this->hasher->hashPassword($user, $signUpRequest->getPassword()));

        $this->em->persist($user);
        $this->em->flush();

        return new UsersListItem($user->getId());
    }
}
