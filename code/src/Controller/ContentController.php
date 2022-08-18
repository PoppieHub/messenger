<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\ContentService;
use App\Service\UserService;
use App\Model\ErrorResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(path: '/api/v1/content/', name: 'content.')]
class ContentController extends AbstractController
{
    public function __construct(private UserService $userService, private ContentService $contentService)
    {
    }

    /**
     * @OA\Tag(name="Content API")
     * @OA\Response(
     *     response=200,
     *     description="Remove a content",
     * )
     *  @OA\Response(
     *     response=404,
     *     description="Content cannot be found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'remove/{id}', name: 'delete', methods: ['DELETE'])]
    public function deleteContent(#[CurrentUser] User $user, int $id): Response
    {
        $this->contentService->deleteFileForContent($user, $id);

        return $this->json(null);
    }
}
