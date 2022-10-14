<?php

namespace App\Exception;

use RuntimeException;

class BlankFormException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Form cannot be submitted empty");
    }
}
