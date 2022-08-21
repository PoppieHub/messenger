<?php

namespace App\Exception;

use RuntimeException;

class UserNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Requested user does not exist");
    }
}