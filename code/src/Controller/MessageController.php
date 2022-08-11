<?php

namespace App\Controller;

use App\Exception\ChatNotFoundException;
use App\Service\MessageService;
use OpenApi\Annotations as OA;
use App\Model\MessagesListResponse;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/v1/chat/{id}/messages', name: 'messages.')]
class MessageController extends AbstractController
{
    public function __construct(private MessageService $messageService)
    {
    }

    /**
     * @OA\Response(
     *     response=200,
     *     description="Return messages by chat",
     *     @Model(type=MessagesListResponse::class)
     * )
     */
    #[Route(path: '/', name: 'getMessages', methods: ['GET'])]
    public function messagesByChat(string $id): Response
    {
        try {
            return $this->json($this->messageService->getMessagesByChat($id));
        } catch (ChatNotFoundException $exception ) {
             throw new HttpException($exception->getCode(), $exception->getMessage());
        }
    }
}