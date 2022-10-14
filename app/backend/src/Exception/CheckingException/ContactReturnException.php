<?php

namespace App\Exception\CheckingException;

use App\Exception\ContactAlreadyExistsException;
use App\Exception\ContactNotAllowedException;
use App\Exception\ContactNotFoundException;
use App\Repository\ContactRepository;
use \App\Entity\Contact;

class ContactReturnException
{
    public function __construct(private ContactRepository $contactRepository)
    {
    }

    public function checkingOnEmpty(Contact|null $contact): void
    {
        if (empty($contact)) {
            throw new ContactNotFoundException();
        }
    }

    public function checkForRecordExistence(string $firstUserId, string $secondUserId): void
    {
        if (!empty($this->contactRepository->recordByWithTwoUsers(
            firstUser: $firstUserId,
            secondUser: $secondUserId
        ))) {
            throw new ContactAlreadyExistsException();
        }
    }

    public function checkUserIdForIdentity(string $firstUserId, string $secondUserId): void
    {
        if ($firstUserId === $secondUserId) {
            throw new ContactAlreadyExistsException();
        }
    }

    public function checkStatus(bool $receivedStatus, bool $userStatus): void
    {
        if ($receivedStatus === $userStatus) {
            throw new ContactNotAllowedException();
        }
    }
}
