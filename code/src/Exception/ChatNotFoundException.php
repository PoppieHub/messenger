<?php

namespace App\Exception;

use RuntimeException;

class ChatNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Chat not found");
    }
}
