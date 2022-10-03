<?php

namespace App\Controller;

use App\Model\ForgotPasswordRequest;
use App\Model\SignUpRequest;
use App\Attribute\RequestBody;
use App\Service\SecurityService;
use App\Model\ErrorResponse;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/api/v1/auth/', name: 'security.')]
class SecurityController extends AbstractController
{
    public function __construct(
        private SecurityService $securityService
    )
    {
    }

    /**
     * @OA\Tag(name="Security API")
     * @OA\Response(
     *     response=200,
     *     description="Signs up a user and send email for verification",
     *     @OA\JsonContent(
     *         @OA\Property(property="token", type="string"),
     *         @OA\Property(property="refresh_token", type="string")
     *     )
     * )
     * @OA\Response(
     *     response=409,
     *     description="User with this email or nickname already exists",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(@Model(type=SignUpRequest::class))
     */
    #[Route(path: 'signUp', name: 'signUp', methods: ['POST'])]
    public function signUp(#[RequestBody] SignUpRequest $signUpRequest): Response
    {
        return $this->securityService->signUp(signUpRequest: $signUpRequest);
    }

    /**
     * @OA\Tag(name="Security API")
     * @OA\Response(
     *     response=200,
     *     description="Confirms the user",
     *     @OA\JsonContent(
     *         @OA\Property(property="request_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, user not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'verification/{token}', name: 'verificationUser', methods: ['GET'])]
    public function verificationUser(string $token): Response
    {
        $request = $this->securityService->acceptVerification($token);

        return $this->json(['request_status' => $request]);
    }

    /**
     * @OA\Tag(name="Security API")
     * @OA\Response(
     *     response=200,
     *     description="Accepts email and nickname and sends a password reset link to email",
     *     @OA\JsonContent(
     *         @OA\Property(property="request_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, user not found",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\Response(
     *     response=400,
     *     description="Validation failed",
     *     @Model(type=ErrorResponse::class)
     * )
     * @OA\RequestBody(
     *     description="Accepts a email and nickname",
     *     @Model(type=ForgotPasswordRequest::class)
     *)
     */
    #[Route(path: 'forgot_password/', name: 'forgot_password', methods: ['POST'])]
    public function forgotPassword(#[RequestBody] ForgotPasswordRequest $forgotPasswordRequest): Response
    {
        $request = $this->securityService->forgotPassword(email: $forgotPasswordRequest->getEmail(), nickname: $forgotPasswordRequest->getNickname());

        return $this->json(['request_status' => $request]);
    }

    /**
     * @OA\Tag(name="Security API")
     * @OA\Response(
     *     response=200,
     *     description="Reset password and send new password to email",
     *     @OA\JsonContent(
     *         @OA\Property(property="request_status", type="boolean")
     *     )
     * )
     * @OA\Response(
     *     response="404",
     *     description="Validation failed, user not found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'resetPassword/{token}', name: 'resetPassword', methods: ['GET'])]
    public function resetPassword(string $token): Response
    {
        $request = $this->securityService->resetPassword($token);

        return $this->json(['request_status' => $request]);
    }
}
