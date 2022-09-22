<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\Membership;
use App\Entity\User;
use App\Exception\CheckingException\ChatReturnException;
use App\Exception\CheckingException\ContactReturnException;
use App\Exception\CheckingException\MembershipReturnException;
use App\Exception\CheckingException\UserReturnException;
use App\Model\MembershipListItem;
use App\Model\MembershipListResponse;
use App\Repository\ChatRepository;
use App\Repository\ContactRepository;
use App\Repository\MembershipRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class MembershipService
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserService $userService,
        private MembershipReturnException $membershipReturnException,
        private ContactReturnException $contactReturnException,
        private ChatReturnException $chatReturnException,
        private UserReturnException $userReturnException,
        private UserRepository $userRepository,
        private MembershipRepository $membershipRepository,
        private ChatRepository $chatRepository,
        private ContactRepository $contactRepository
    ) {
    }

    public function addMembershipForMultiChat(User $currentUser, string $addedUserId, string $chatId): bool
    {
        $addedUser = $this->userRepository->findUserById($addedUserId);
        $chat = $this->chatRepository->findChatById($chatId);

        $this->userReturnException->checkUserOnEmpty($currentUser);
        $this->userReturnException->checkUserOnEmpty($addedUser);

        return $this->setMembershipForChat(userWhoIsChatting: $currentUser, addedUser: $addedUser, chat: $chat);
    }

    public function setMembershipForChat(User $userWhoIsChatting, User $addedUser, Chat|null $chat, bool $isNewChat = false): bool
    {
        $this->chatReturnException->checkExistsChat($chat);

        if ($isNewChat === false) {
            $this->membershipReturnException->checkExistsMembership(
                $this->membershipRepository->findMembership(userId: $userWhoIsChatting->getId(), chatId: $chat->getId())
            );

            $this->membershipReturnException->checkAlreadyExistsMembership(
                $this->membershipRepository->findMembership(userId: $addedUser->getId(), chatId: $chat->getId())
            );

            if ($chat->isMultiChat() !== false) {
                $contact = $this->contactRepository->recordByWithTwoUsers(
                    firstUser: $userWhoIsChatting->getId(),
                    secondUser: $addedUser->getId()
                );
                $this->contactReturnException->checkingOnEmpty(contact: $contact);
                $this->contactReturnException->checkStatus(receivedStatus: $contact->isStatus(), userStatus: false);
            }
        }

        $membership = (new Membership())
            ->setNotification(false)
            ->setChat($chat)
            ->setUser($addedUser);

        $this->em->persist($membership);
        $this->em->flush();

        return true;
    }

    public function updateNotification(User $currentUser, string $chatId, bool $notification): bool
    {
        $membership = $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chatId);
        $this->membershipReturnException->checkExistsMembership($membership);

        if ($membership->isNotification() !== $notification) {
            $membership->setNotification($notification);
            $this->em->flush();

            return true;
        }

        return false;
    }

    public function deleteMemberships(User $currentUser, Chat $chat): void
    {
        if ($chat->isMultiChat()) {
            $this->membershipReturnException->checkEqualityOfTwoMembership(
                firstMembershipId: $currentUser->getId(),
                secondMembershipId: $this->membershipRepository->findFirstMembershipByChatId(
                    chatId: $chat->getId()
                )->getUser()->getId()
            );
        }

        $this->membershipRepository->deleteMembershipsByChatId(chatId: $chat->getId());
    }

    public function deleteMembershipByMultiChat(User $currentUser, string $membershipId): bool
    {
        $membership = $this->membershipRepository->findMembershipById($membershipId);
        $this->membershipReturnException->checkExistsMembership($membership);

        $chat = $membership->getChat();
        $this->chatReturnException->checkExistsChat($chat);
        $this->chatReturnException->checkNotIsChatMulti($chat);

        $currentUserId = $currentUser->getId();

        if ($membership->getUser()->getId() !== $currentUserId) {
            $this->membershipReturnException->checkEqualityOfTwoMembership(
                firstMembershipId: $currentUserId,
                secondMembershipId: $this->membershipRepository->findFirstMembershipByChatId(
                    chatId: $chat->getId()
                )->getUser()->getId()
            );
        }

        $this->em->remove($membership);
        $this->em->flush();

        return true;
    }

    public function getCollectionMembership(array $collectionMembership): MembershipListResponse
    {
        return new MembershipListResponse(array_map(
            fn (Membership $membership) => $this->getMembership(membership: $membership),
            $collectionMembership
        ));
    }

    public function getMembership(Membership $membership): MembershipListItem
    {
        return (new MembershipListItem())
            ->setId($membership->getId())
            ->setNotification(false)
            ->setUsersListItem(
                $this->userService->getProfile($membership->getUser())
            );
    }
}
