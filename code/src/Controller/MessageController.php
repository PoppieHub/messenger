<?php

namespace App\Controller;

use App\Attribute\RequestBody;
use App\Entity\User;
use App\Model\FindRequest;
use App\Model\MessageRequest;
use App\Model\MessagesListItem;
use App\Model\MessagesListResponse;
use App\Model\UpdateMessageItem;
use App\Service\MessageService;
use OpenApi\Annotations as OA;
use App\Model\MessagesShortListRequest;
use App\Model\ErrorResponse;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(path: '/api/v1/message', name: 'messages.')]
class MessageController extends AbstractController
{
    public function __construct(private MessageService $messageService)
    {
    }

    /**
     * @OA\Tag(name="Message API")
     * @OA\Response(
     *     response=200,
     *     description="Removes the message collection",
     *     @Model(type=MessagesShortListRequest::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Message not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=409,
     *     description="Validation failed, Membership has no right",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=MessagesShortListRequest::class)
     * )
     */
    #[Route(path: '/remove', name: 'delete', methods: ['DELETE'])]
    public function deleteMessages(#[CurrentUser] User $currentUser, #[RequestBody] MessagesShortListRequest $request): Response
    {
        $this->messageService->deleteCollectionMessage(currentUser: $currentUser, collectionMessage: $request);
        return $this->json(['request' => $request, 'request_status' => true]);
    }

    /**
     * @OA\Tag(name="Message API")
     * @OA\Response(
     *     response=200,
     *     description="Adds a message for the current user and returns it",
     *     @Model(type=MessagesListItem::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Chat or Membership not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=MessageRequest::class)
     * )
     */
    #[Route(path: '/addMessage', name: 'addMessage', methods: ['POST'])]
    public function addMessage(#[CurrentUser] User $currentUser, #[RequestBody] MessageRequest $request): Response
    {
        return $this->json($this->messageService->addMessage(currentUser: $currentUser, messageRequest: $request));
    }

    /**
     * @OA\Tag(name="Message API")
     * @OA\Response(
     *     response=200,
     *     description="Update a message for the current user and returns it",
     *     @Model(type=MessagesListItem::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Message not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=409,
     *     description="Validation failed, User has no right",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=422,
     *     description="Validation failed, Time to make a change has expired (maximum one week)",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=UpdateMessageItem::class)
     * )
     */
    #[Route(path: '/updateMessage', name: 'updateMessage', methods: ['POST'])]
    public function updateMessage(#[CurrentUser] User $currentUser, #[RequestBody] UpdateMessageItem $request): Response
    {
        return $this->json($this->messageService->updateMessage(user: $currentUser, updateMessageItem: $request));
    }

    /**
     * @OA\Tag(name="Message API")
     * @OA\Response(
     *     response=200,
     *     description="Returns found messages",
     *     @Model(type=MessagesListResponse::class)
     * )
     * * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     description="Accepts a searchValue, or parts of them for search.",
     *     @Model(type=FindRequest::class)
     *)
     */
    #[Route(path: '/searchMessage', name: 'searchMessage', methods: ['POST'])]
    public function searchMessage(#[CurrentUser] User $currentUser, #[RequestBody] FindRequest $request): Response
    {
        return $this->json($this->messageService->getFoundMessage(currentUser: $currentUser, searchValue: $request));
    }
}
