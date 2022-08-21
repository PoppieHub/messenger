<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\ContentService;
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
    public function __construct(private ContentService $contentService)
    {
    }

    /**
     * @OA\Tag(name="Content API")
     * @OA\Response(
     *     response=200,
     *     description="Remove a content",
     *     @OA\JsonContent(
     *         @OA\Property(property="contentId", type="string"),
     *         @OA\Property(property="remove_status", type="boolean")
     *     )
     * )
     *  @OA\Response(
     *     response=404,
     *     description="Content cannot be found",
     *     @Model(type=ErrorResponse::class)
     * )
     */
    #[Route(path: 'remove/{contentId}', name: 'delete', methods: ['DELETE'])]
    public function deleteContent(#[CurrentUser] User $currentUser, string $contentId): Response
    {
        $this->contentService->deleteFileForContent($currentUser, $contentId);

        return $this->json(['contentId' => $contentId, 'remove_status' => true]);
    }
}
