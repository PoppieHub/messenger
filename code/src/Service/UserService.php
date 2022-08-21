<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\CheckingException\UserReturnException;
use App\Model\FindRequest;
use App\Model\ProfileRequest;
use App\Model\UsersListItem;
use App\Model\UsersListResponse;
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
        private ContentRepository $contentRepository,
        private UserReturnException $userReturnException
    ) {
    }

    public function getProfile(User $user): UsersListItem
    {
        $profile = (new UsersListItem())
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

        if ($user->isHideEmail() !== false) {
            $profile->setEmail('hidden');
        }

        return $profile;
    }

    public function getProfiles(array $collectionProfiles = null): UsersListResponse
    {
        if ($collectionProfiles === null) {
            return $collectionProfiles;
        }

        return new UsersListResponse(array_map(
            [$this, 'getProfile'],
            $collectionProfiles
        ));
    }

    public function getFoundUsers(User $currentUser, FindRequest $searchValue): UsersListResponse
    {
        return $this->getProfiles(
            collectionProfiles: $this->userRepository->findUsersByEmailOrNickname(
                searchValue: $searchValue->getSearchValue(),
                userId: $currentUser->getId()
            )
        );
    }

    public function changeProfile(User $user, ProfileRequest $profile): UsersListItem
    {
        if ($profile->getNickname() !== null) {
            $this->userReturnException->checkUserExistenceOnNickname(nickname: $profile->getNickname());
            $this->userReturnException->checkingForTheCoincidenceOfTwoUniqueParameters(
                firstParameter: $user->getNickname(),
                secondParameter: $profile->getNickname()
            );

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
