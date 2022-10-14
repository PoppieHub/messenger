<?php

namespace App\Exception;

use RuntimeException;

class UserAlreadyExistsException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("User with this email or nickname already exists");
    }
}