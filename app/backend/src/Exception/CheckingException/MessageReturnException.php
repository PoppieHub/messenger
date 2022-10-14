<?php

namespace App\Exception\CheckingException;

use App\Entity\Message;
use App\Exception\MessageNotFoundException;
use App\Exception\TimeOutException;
use DateTime;

class MessageReturnException
{
    public function __construct()
    {
    }

    public function checkExistsMessage(Message|null $message): void
    {
        if (empty($message)) {
            throw new MessageNotFoundException();
        }
    }

    public function checkingExpirationOfSpecifiedTime(int $timestamp, int $timeOut): void
    {
        $currentTime = new DateTime();
        if ($timestamp - $currentTime->getTimestamp() > $timeOut) {
            throw new TimeOutException();
        }
    }
}
