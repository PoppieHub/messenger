<?php

namespace App\Exception;

use RuntimeException;

class ContactNotAllowedException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Contact not allowed");
    }
}
