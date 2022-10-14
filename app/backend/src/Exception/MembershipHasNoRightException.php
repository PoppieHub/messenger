<?php

namespace App\Exception;

use RuntimeException;

class MembershipHasNoRightException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Membership has no right");
    }
}
