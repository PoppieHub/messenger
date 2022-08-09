<?php

namespace App\Controller;

use App\Service\ChatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/v1/chat', name: 'chats.')]
class  ChatController extends AbstractController
{
    public function __construct(private ChatService $chatService)
    {
    }

    #[Route('/', name: 'getChats')]
    public function chats(): Response
    {
        return $this->json($this->chatService->getChats() );
    }
}
