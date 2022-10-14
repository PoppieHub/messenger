<?php

namespace App\Exception;

use RuntimeException;

class ContactNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Contact not found");
    }
}
