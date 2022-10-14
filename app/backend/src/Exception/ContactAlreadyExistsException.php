<?php

namespace App\Exception;

use RuntimeException;

class ContactAlreadyExistsException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Contact already exists, repeated request is not allowed or the user cannot add himself");
    }
}