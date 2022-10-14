<?php

namespace App\Exception\CheckingException;

use App\Entity\Chat;
use App\Exception\ChatNotFoundException;

class ChatReturnException
{
    public function __construct()
    {
    }

    public function checkExistsChat(Chat|null $chat): void
    {
        if (empty($chat)) {
            throw new ChatNotFoundException();
        }
    }

    public function checkNotIsChatMulti(Chat $chat): void
    {
        if (!$chat->isMultiChat()) {
            throw new ChatNotFoundException();
        }
    }
}
