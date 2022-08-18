<?php

namespace App\Exception;

use RuntimeException;

class ContentNotFoundException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Content cannot be found");
    }
}