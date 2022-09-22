<?php

namespace App\Exception;

use RuntimeException;

class MembershipAlreadyExistsException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Membership already exists in chat");
    }
}
