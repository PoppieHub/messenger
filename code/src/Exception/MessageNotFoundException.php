<?php

namespace App\Exception;

use RuntimeException;

class MessageNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Message not found");
    }
}
