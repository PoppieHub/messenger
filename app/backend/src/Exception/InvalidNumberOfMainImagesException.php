<?php

namespace App\Exception;

use RuntimeException;

class InvalidNumberOfMainImagesException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Invalid number of main images, the maximum value should not exceed five");
    }
}
