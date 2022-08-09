<?php

namespace App\Controller;

use App\Model\ChatsListResponse;
use App\Service\ChatService;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Annotations as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/v1/chat', name: 'chats.')]
class  ChatController extends AbstractController
{
    public function __construct(private ChatService $chatService)
    {
    }

    /**
     * @OA\Response(
     *     response=200,
     *     description="Return chats",
     *     @Model(type=ChatsListResponse::class)
     * )
     */
    #[Route(path: '/', name: 'getChats', methods: ['GET'])]
    public function chats(): Response
    {
        return $this->json($this->chatService->getChats() );
    }
}
