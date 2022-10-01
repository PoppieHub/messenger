<?php

namespace App\Exception;

use RuntimeException;

class UserNotVerifiedException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("User not verified!");
    }
}