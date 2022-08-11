<?php

namespace App\Exception;

use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

class ChatNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Chat not found", Response::HTTP_NOT_FOUND);
    }
}