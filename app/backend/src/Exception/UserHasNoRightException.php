<?php

namespace App\Exception;

use RuntimeException;

class UserHasNoRightException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("User has no right");
    }
}
