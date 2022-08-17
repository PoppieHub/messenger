<?php

namespace App\Controller;

use App\Attribute\RequestBody;
use App\Entity\User;
use App\Model\ProfileRequest;
use App\Model\UsersListItem;
use App\Model\ErrorResponse;
use App\Service\UserService;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(path: '/api/v1/user/', name: 'user.')]
class UserController extends AbstractController
{
    public function __construct(private UserService $userService)
    {
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
    public function profile(#[CurrentUser] User $user): Response
    {
        return $this->json($this->userService->getProfile($user));
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
    #[Route(path: 'changeProfile/', name: 'changeProfile', methods: ['POST'])]
    public function changeProfile(#[CurrentUser] User $user, #[RequestBody] ProfileRequest $request): Response
    {
        return $this->json($this->userService->changeProfile($user, $request));
    }
}
