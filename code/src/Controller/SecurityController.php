<?php

namespace App\Controller;

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
    public function __construct(private SecurityService $securityService)
    {
    }

    /**
     * @OA\Tag(name="Security API")
     * @OA\Response(
     *     response=200,
     *     description="Signs up a user",
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
}