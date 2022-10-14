<?php

namespace App\Controller;

use App\Attribute\RequestBody;
use App\Attribute\RequestFile;
use App\Entity\User;
use App\Model\ContactListItem;
use App\Model\ContactListResponse;
use App\Model\ProfileRequest;
use App\Model\UsersListItem;
use App\Model\UsersListResponse;
use App\Model\ErrorResponse;
use App\Model\ContentListItem;
use App\Model\FindRequest;
use App\Service\ContactService;
use App\Service\UserService;
use App\Service\ContentService;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotNull;

#[Route(path: '/api/v1/user/', name: 'user.')]
class UserController extends AbstractController
{
    public function __construct(
        private UserService $userService,
        private ContentService $contentService,
        private ContactService $contactService
    ) {
    }

    /**
     * @OA\Tag(name="User API")
     * @OA\Response(
     *     response=200,
     *     description="Returns the user profile",
     *     @Model(type=UsersListItem::class)
     * )
     */
    #[Route(path: 'profile/', name: 'getProfile', methods: ['GET'])]
    public function profile(#[CurrentUser] User $currentUser): Response
    {
        return $this->json($this->userService->getProfile(user: $currentUser));
    }

    /**
     * @OA\Tag(name="User API")
     * @OA\Response(
     *     response=200,
     *     description="Returns the modified user profile",
     *     @Model(type=UsersListItem::class)
     * )
     * @OA\Response(
     *     response=409,
     *     description="User with this email or nickname already exists",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     @Model(type=ProfileRequest::class)
     * )
     */
    #[Route(path: 'changeProfile/', name: 'changeProfile', methods: ['PUT'])]
    public function changeProfile(#[CurrentUser] User $currentUser, #[RequestBody] ProfileRequest $request): Response
    {
        return $this->json($this->userService->changeProfile(user: $currentUser, profile: $request));
    }

    /**
     * @OA\Tag(name="User API")
     * @OA\Response(
     *     response=200,
     *     description="Upload avatar for user",
     *     @Model(type=ContentListItem::class)
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
     */
    #[Route(path: 'uploadAvatar/', name: 'uploadAvatar', methods: ['POST'])]
    public function uploadAvatar(
        #[CurrentUser] User $currentUser,
        #[RequestFile(field: 'avatar', constraints: [
            new NotNull(),
            new Image(maxSize: '50M', mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'])
        ])] UploadedFile $file
    ): Response {
        return $this->json($this->contentService->uploadFileForContent(user: $currentUser, file: $file, avatarValue: true));
    }

    /**
     * @OA\Tag(name="User API")
     * @OA\Response(
     *     response=200,
     *     description="Returns found users by email or nickname",
     *     @Model(type=UsersListResponse::class)
     * )
     * * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     description="Accepts a nickname, or email, or parts of them for search. But the search by email is carried out if the user has not set the flag - hide email",
     *     @Model(type=FindRequest::class)
     *)
     */
    #[Route(path: 'find', name: 'getFoundUsers', methods: ['POST'])]
    public function findUsers(#[CurrentUser] User $currentUser, #[RequestBody] FindRequest $request): Response
    {
        return $this->json($this->userService->getFoundUsers(currentUser: $currentUser, searchValue: $request));
    }

    /**
     * @OA\Tag(name="Contact API")
     * @OA\Response(
     *     response=200,
     *     description="Returns records with contacts for the current user",
     *     @Model(type=ContactListResponse::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Requested user does not exist",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'getContacts/', name: 'getContacts', methods: ['GET'])]
    public function getContacts(#[CurrentUser] User $currentUser): Response
    {
        return $this->json($this->contactService->getContactsForUser(user: $currentUser));
    }

    /**
     * @OA\Tag(name="Contact API")
     * @OA\Response(
     *     response=200,
     *     description="Adds a user to contacts and returns an entry",
     *     @Model(type=ContactListItem::class)
     * )
     * @OA\Response(
     *     response=409,
     *     description="Validation failed, сontact already exists, repeated request is not allowed or the user cannot add himself",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Validation failed, Requested user does not exist",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'addContact/{otherUserId}', name: 'addContact', methods: ['GET'])]
    public function addContact(#[CurrentUser] User $currentUser, string $otherUserId): Response
    {
        return $this->json($this->contactService->setContactForUser(user: $currentUser, otherUserId: $otherUserId, status: false));
    }

    /**
     * @OA\Tag(name="Contact API")
     * @OA\Response(
     *     response=200,
     *     description="Adds a user to contacts and returns an entry",
     *     @Model(type=ContactListItem::class)
     * )
     * @OA\Response(
     *     response=404,
     *     description="Contact cannot be found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=409,
     *     description="Contact not allowed",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'acceptContact/{contactId}', name: 'acceptContact', methods: ['PUT'])]
    public function acceptContact(#[CurrentUser] User $currentUser, string $contactId): Response
    {
        return $this->json($this->contactService->acceptContact(user: $currentUser, contactId: $contactId));
    }

    /**
     * @OA\Tag(name="Contact API")
     * @OA\Response(
     *     response=200,
     *     description="Remove a contact",
     *     @OA\JsonContent(
     *         @OA\Property(property="contactId", type="string"),
     *         @OA\Property(property="remove_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response=404,
     *     description="Contact cannot be found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'delete_contact/{contactId}', name: 'deleteContact', methods: ['DELETE'])]
    public function deleteContact(#[CurrentUser] User $currentUser, string $contactId): Response
    {
        $this->contactService->deleteContact(user: $currentUser, contactId: $contactId);

        return $this->json(['contactId' => $contactId, 'remove_status' => true]);
    }

    /**
     * @OA\Tag(name="User API")
     * @OA\Response(
     *     response=200,
     *     description="Deletes a user, related contacts, messages, members, content",
     *     @OA\JsonContent(
     *         @OA\Property(property="userId", type="string"),
     *         @OA\Property(property="request_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, user not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'delete', name: 'delete', methods: ['DELETE'])]
    public function deleteUser(#[CurrentUser] User $currentUser): Response
    {
        $request = $this->userService->deleteUser(user: $currentUser);

        return $this->json(['userId' => $currentUser->getId(), 'request_status' => $request]);
    }
}
