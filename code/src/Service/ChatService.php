<?php

namespace App\Service;

use App\Entity\Chat;
use App\Model\ChatsListItem;
use App\Model\ChatsListResponse;
use App\Repository\ChatRepository;
use Doctrine\Common\Collections\Criteria;

class ChatService
{
    public function __construct(private ChatRepository $chatRepository)
    {
    }

    public function getChats(): ChatsListResponse
    {
         $chats = $this->chatRepository->findBy([], ['name' => Criteria::ASC]);
         $items = array_map(
             fn (Chat $chat) => new ChatsListItem(
                 $chat->getId(),
                 $chat->getName(),
                 $chat->getDescription()
             ),
             $chats
         );

         return new ChatsListResponse($items);
    }
}