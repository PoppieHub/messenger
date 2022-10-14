<?php

namespace App\Exception;

use RuntimeException;

class UploadFileInvalidTypeException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct("Uploaded file type is invalid");
    }
}