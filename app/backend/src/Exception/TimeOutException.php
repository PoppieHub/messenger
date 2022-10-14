<?php

namespace App\Exception;

use RuntimeException;

class TimeOutException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Time to make a change has expired");
    }
}
