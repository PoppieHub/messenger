<?php

namespace App\Controller;

use App\Attribute\RequestBody;
use App\Attribute\RequestFile;
use App\Model\ErrorResponse;
use App\Model\ContentListItem;
use App\Model\ChatsListItem;
use App\Entity\User;
use App\Model\ChatRequest;
use App\Model\ChatsListResponse;
use App\Model\ChatUpdateRequest;
use App\Service\ChatService;
use App\Service\SecurityService;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Annotations as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotNull;

#[Route(path: '/api/v1/chats', name: 'chats.')]
class ChatController extends AbstractController
{
    public function __construct(private ChatService $chatService, private SecurityService $securityService)
    {
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="Return chats for current user",
     *     @Model(type=ChatsListResponse::class)
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Requested user does not exist",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/', name: 'getChats', methods: ['GET'])]
    public function chats(#[CurrentUser] User $currentUser): Response
    {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->chatService->getListChats($currentUser));
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="Creates a multiplayer chat and returns it",
     *     @Model(type=ChatsListResponse::class)
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=ChatRequest::class)
     * )
     */
    #[Route(path: '/newMultiChat', name: 'newMultiChat', methods: ['POST'])]
    public function newMultiChat(#[CurrentUser] User $currentUser, #[RequestBody] ChatRequest $chatRequest): Response
    {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->chatService->createMultiChat(
            currentUser:  $currentUser,
            name:  $chatRequest->getName(),
            description: $chatRequest->getDescription()
        ));
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="Update a multiplayer chat and returns it",
     *     @Model(type=ChatsListResponse::class)
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, User in members or chat not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=ChatUpdateRequest::class)
     * )
     */
    #[Route(path: '/updateMultiChat', name: 'updateMultiChat', methods: ['POST'])]
    public function updateMultiChat(#[CurrentUser] User $currentUser, #[RequestBody] ChatUpdateRequest $chatUpdateRequest): Response
    {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->chatService->updateMultiChat(
            currentUser:  $currentUser,
            chatId: $chatUpdateRequest->getId(),
            name:  $chatUpdateRequest->getName(),
            description: $chatUpdateRequest->getDescription()
        ));
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="Upload avatar for user",
     *     @Model(type=ContentListItem::class)
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="409",
     *     description="Uploaded file type is invalid",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="422",
     *     description="Invalid number of main images",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, User in members or chat not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/uploadAvatar/{chatId}', name: 'uploadAvatar', methods: ['POST'])]
    public function uploadAvatar(
        #[CurrentUser] User $currentUser,
        #[RequestFile(field: 'avatar', constraints: [
            new NotNull(),
            new Image(maxSize: '50M', mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'])
        ])] UploadedFile $file,
        string $chatId
    ): Response {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->chatService->uploadAvatar(user: $currentUser, file: $file, chatId: $chatId));
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="returns the chat if the chat exists, otherwise a new chat is created and returned",
     *     @Model(type=ChatsListItem::class)
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="404",
     *     description="User does not exist or chat does not exist",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/getChat/otherUser/{otherUserId}', name: 'getChat', methods: ['GET'])]
    public function getChat(#[CurrentUser] User $currentUser, string $otherUserId): Response
    {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->chatService->getDefaultChat(currentUser: $currentUser, otherUserId: $otherUserId));
    }

    /**
     * @OA\Tag(name="Chat API")
     * @OA\Response(
     *     response=200,
     *     description="deletes all messages, then all participants, then the chat",
     *     @OA\JsonContent(
     *         @OA\Property(property="chatId", type="string"),
     *         @OA\Property(property="remove_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, chat not found
     *          or membership not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="409",
     *     description="Validation failed, Membership has no right",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/remove/{chatId}', name: 'delete', methods: ['DELETE'])]
    public function deleteChat(#[CurrentUser] User $currentUser, string $chatId): Response
    {
        $this->securityService->isVerification($currentUser);
        $request = $this->chatService->deleteChat(currentUser: $currentUser, chatId: $chatId);

        return $this->json(['chatId' => $chatId, 'remove_status' => $request]);
    }
}
