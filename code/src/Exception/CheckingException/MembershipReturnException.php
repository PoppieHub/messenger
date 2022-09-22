<?php

namespace App\Exception\CheckingException;

use App\Entity\Membership;
use App\Exception\MembershipAlreadyExistsException;
use App\Exception\MembershipHasNoRightException;
use App\Exception\MembershipNotFoundException;

class MembershipReturnException
{
    public function __construct()
    {
    }

    public function checkAlreadyExistsMembership(Membership|null $membership): void
    {
        if ($membership !== null) {
            throw new MembershipAlreadyExistsException();
        }
    }

    public function checkExistsMembership(Membership|null $membership): void
    {
        if ($membership === null) {
            throw new MembershipNotFoundException();
        }
    }

    public function checkEqualityOfTwoMembership(string $firstMembershipId, string $secondMembershipId): void
    {
        if ($firstMembershipId !== $secondMembershipId) {
            throw new MembershipHasNoRightException();
        }
    }
}
