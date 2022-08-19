<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\UserAlreadyExistsException;
use App\Model\ProfileRequest;
use App\Model\UsersListItem;
use App\Repository\ContentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private UserPasswordHasherInterface $hasher,
        private UserRepository $userRepository,
        private EntityManagerInterface $em,
        private ContentService $contentService,
        private ContentRepository $contentRepository
    ) {
    }

    public function getProfile(User $user): UsersListItem
    {
        return (new UsersListItem())
            ->setId($user->getId())
            ->setEmail($user->getEmail())
            ->setNickname($user->getNickname())
            ->setHideEmail($user->isHideEmail())
            ->setVerified($user->isVerified())
            ->setContent(
                $this->contentService->getCollectionContent(
                    $this->contentRepository->getContentForUser($user->getId(), true)
                )
            );
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
