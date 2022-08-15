<?php

namespace App\Controller;

use App\Service\MessageService;
use OpenApi\Annotations as OA;
use App\Model\MessagesListResponse;
use App\Model\ErrorResponse;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route(path: '/api/v1/chat/{id}/messages', name: 'messages.')]
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
     * @OA\Response(
     *     response=404,
     *     description="Chat not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/', name: 'getMessages', methods: ['GET'])]
    public function messagesByChat(string $id): Response
    {
        return $this->json($this->messageService->getMessagesByChat($id), Response::HTTP_OK, [], [
            AbstractNormalizer::IGNORED_ATTRIBUTES
        ]);
    }
}
