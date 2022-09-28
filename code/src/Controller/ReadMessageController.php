<?php

namespace App\Controller;

use App\Model\MessagesShortListRequest;
use App\Service\ReadMessageService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use App\Attribute\RequestBody;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Model\ErrorResponse;

#[Route(path: '/api/v1/readMessage', name: 'readMessage.')]
class ReadMessageController extends AbstractController
{
    public function __construct(private ReadMessageService $readMessageService)
    {
    }

    /**
     * @OA\Tag(name="ReadMessage API")
     * @OA\Response(
     *     response=200,
     *     description="Removes the ReadMessage collection",
     *     @Model(type=MessagesShortListRequest::class)
     * )
     * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=MessagesShortListRequest::class)
     * )
     */
    #[Route(path: '/remove', name: 'delete', methods: ['DELETE'])]
    public function deleteReadMessages(#[CurrentUser] User $currentUser, #[RequestBody] MessagesShortListRequest $request): Response
    {
        $this->readMessageService->deleteCollectionReadMessage(currentUser: $currentUser, collectionMessage: $request);
        return $this->json(['request' => $request, 'request_status' => true]);
    }

    /**
     * @OA\Tag(name="ReadMessage API")
     * @OA\Response(
     *     response=200,
     *     description="Added the ReadMessage collection",
     *     @Model(type=MessagesShortListRequest::class)
     * )
     * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=MessagesShortListRequest::class)
     * )
     */
    #[Route(path: '/add', name: 'add', methods: ['POST'])]
    public function addReadMessage(#[CurrentUser] User $currentUser, #[RequestBody] MessagesShortListRequest $request): Response
    {
        $this->readMessageService->addReadMessage(currentUser: $currentUser, collectionMessage: $request);
        return $this->json(['request' => $request, 'request_status' => true]);
    }
}
