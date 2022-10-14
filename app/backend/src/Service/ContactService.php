<?php

namespace App\Service;

use App\Entity\Contact;
use App\Entity\User;
use App\Exception\CheckingException\ContactReturnException;
use App\Exception\CheckingException\UserReturnException;
use App\Model\ContactListItem;
use App\Model\ContactListResponse;
use App\Repository\ContactRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class ContactService
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserService $userService,
        private UserRepository $userRepository,
        private ContactRepository $contactRepository,
        private ContactReturnException $contactReturnException,
        private UserReturnException $userReturnException
    ) {
    }

    public function acceptContact(User $user, string $contactId): ContactListItem
    {
        $contact = $this->contactRepository->findByContactIdAndFromUser(contactId: $contactId, userId: $user->getId());

        $this->contactReturnException->checkingOnEmpty(contact: $contact);
        $this->contactReturnException->checkStatus(receivedStatus: $contact->isStatus(), userStatus: true);

        self::updateContact(contact: $contact, status: true);

        return $this->getContact(contact: $contact, currentUser: $user);
    }

    private function updateContact(Contact $contact, bool $status = false): void
    {
        $contact->setStatus($status);

        $this->em->flush();
    }

    public function deleteContact(User $user, string $contactId): void
    {
        $contact = $this->contactRepository->findRecordByContactIdAndUserId(contactId: $contactId, userId: $user->getId());

        $this->contactReturnException->checkingOnEmpty(contact: $contact);

        $this->em->remove($contact);
        $this->em->flush();
    }

    public function setContactForUser(User $user, string $otherUserId, $status = false): ContactListItem
    {
        $this->contactReturnException->checkForRecordExistence(firstUserId: $user->getId(), secondUserId: $otherUserId);
        $this->contactReturnException->checkUserIdForIdentity(firstUserId: $user->getId(), secondUserId: $otherUserId);

        $otherUser = $this->userRepository->findUserById($otherUserId);

        $this->userReturnException->checkUserOnEmpty(user: $otherUser);

        $contact = (new Contact())
            ->setFromUser($user)
            ->setToUser($otherUser)
            ->setStatus($status);

        $this->em->persist($contact);
        $this->em->flush();

        return $this->getContact(contact: $contact, currentUser: $user);
    }

    public function getContactsForUser(User $user): ContactListResponse
    {
        $this->userReturnException->checkUserOnEmpty(user: $user);

        return $this->getCollectionContacts(
            currentUser: $user,
            collectionContact: $this->contactRepository->findRecordsByUser($user->getId())
        );
    }

    public function getCollectionContacts(User $currentUser, array $collectionContact = null): ContactListResponse
    {
        if ($collectionContact === null) {
            return $collectionContact;
        }

        return new ContactListResponse(array_map(
            fn ($contact) => $this->getContact(contact: $contact, currentUser: $currentUser),
            $collectionContact
        ));
    }

    public function getContact(Contact $contact, User $currentUser): ContactListItem
    {
        $contactItem = (new ContactListItem())
            ->setId($contact->getId())
            ->setStatus($contact->isStatus());

        if ($contact->getToUser() !== null) {
            ($contact->getToUser() === $currentUser->getId())?
                $contactItem->setToUser(
                    $this->userService->getProfile($currentUser)
                ):
                $contactItem->setToUser(
                    $this->userService->getProfile(
                        $this->userRepository->findUserById($contact->getToUser()->getId())
                    )
                );
        }

        if ($contact->getFromUser() !== null) {
            ($contact->getFromUser() === $currentUser->getId())?
                $contactItem->setFromUser(
                    $this->userService->getProfile($currentUser)
                ):
                $contactItem->setFromUser(
                    $this->userService->getProfile(
                        $this->userRepository->findUserById($contact->getFromUser()->getId())
                    )
                );
        }

        return $contactItem;
    }
}
