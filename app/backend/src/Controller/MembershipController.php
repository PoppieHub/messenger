<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\MembershipService;
use App\Service\SecurityService;
use OpenApi\Annotations as OA;
use App\Model\ErrorResponse;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(path: '/api/v1/membership', name: 'membership.')]
class MembershipController extends AbstractController
{
    public function __construct(private MembershipService $membershipService, private SecurityService $securityService)
    {
    }

    /**
     * @OA\Tag(name="Membership API")
     * @OA\Response(
     *     response=200,
     *     description="adds the user to the chat if he is in contacts",
     *     @OA\JsonContent(
     *         @OA\Property(property="userId", type="string"),
     *         @OA\Property(property="chatId", type="string"),
     *         @OA\Property(property="added_status", type="boolean")
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
     *          or user not found
     *          or contact not found
     *          or the user being added already exists in the chat
     *          or the user who is adding another user is not in the chat",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/add/userId/{userId}/chatId/{chatId}', name: 'addMembership', methods: ['GET'])]
    public function addMembershipForMultiChat(#[CurrentUser] User $currentUser, string $userId, string $chatId): Response
    {
        $this->securityService->isVerification($currentUser);

        $this->membershipService->addMembershipForMultiChat(
            currentUser: $currentUser,
            addedUserId: $userId,
            chatId: $chatId
        );

        return $this->json(['userId' => $userId, 'chatId' => $chatId, 'added_status' => true]);
    }

    /**
     * @OA\Tag(name="Membership API")
     * @OA\Response(
     *     response=200,
     *     description="updates notification status for a membership",
     *     @OA\JsonContent(
     *         @OA\Property(property="userId", type="string"),
     *         @OA\Property(property="chatId", type="string"),
     *         @OA\Property(property="notification_status", type="boolean"),
     *         @OA\Property(property="update_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response="409",
     *     description="Membership not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: '/update/chatId/{chatId}/notification/{notification}', name: 'updateNotification', methods: ['PUT'])]
    public function updateNotification(#[CurrentUser] User $currentUser, string $chatId, bool $notification): Response
    {
        $this->securityService->isVerification($currentUser);

        $updateStatus = $this->membershipService->updateNotification(
            currentUser: $currentUser,
            chatId: $chatId,
            notification: $notification
        );

        return $this->json(['userId' => $currentUser->getId(), 'chatId' => $chatId, 'notification_status' => $notification, 'update_status' => $updateStatus]);
    }

    /**
     * @OA\Tag(name="Membership API")
     * @OA\Response(
     *     response=200,
     *     description="deletes a membership if it is the current user or has permission to delete another membership in the chat",
     *     @OA\JsonContent(
     *         @OA\Property(property="membershipId", type="string"),
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
    #[Route(path: '/remove/{membershipId}', name: 'delete', methods: ['DELETE'])]
    public function deleteMembership(#[CurrentUser] User $currentUser, string $membershipId): Response
    {
        $this->securityService->isVerification($currentUser);

        $request = $this->membershipService->deleteMembershipByMultiChat(currentUser: $currentUser, membershipId: $membershipId);

        return $this->json(['membershipId' => $membershipId, 'remove_status' => $request]);
    }
}
