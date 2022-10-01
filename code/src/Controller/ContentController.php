<?php

namespace App\Controller;

use App\Attribute\RequestFile;
use App\Entity\User;
use App\Service\ContentService;
use App\Model\ErrorResponse;
use App\Model\ContentListItem;
use App\Service\SecurityService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\HttpFoundation\File\UploadedFile;

#[Route(path: '/api/v1/content/', name: 'content.')]
class ContentController extends AbstractController
{
    public function __construct(private ContentService $contentService, private SecurityService $securityService)
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
     * @OA\Response(
     *     response=403,
     *     description="Validation failed, User not verified!",
     *     @Model(type=ErrorResponse::class)
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
        $this->securityService->isVerification($currentUser);

        $this->contentService->deleteFileForContent($currentUser, $contentId);

        return $this->json(['contentId' => $contentId, 'remove_status' => true]);
    }

    /**
     * @OA\Tag(name="Content API")
     * @OA\Response(
     *     response=200,
     *     description="Upload image for content and return it",
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
     */
    #[Route(path: 'upload/image', name: 'uploadImage', methods: ['POST'])]
    public function uploadImage(
        #[CurrentUser] User $currentUser,
        #[RequestFile(field: 'image', constraints: [
            new NotNull(),
            new Image(maxSize: '50M', mimeTypes: ['image/*']),
        ])] UploadedFile $file
    ): Response {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->contentService->uploadFileForContent(user: $currentUser, file: $file));
    }

    /**
     * @OA\Tag(name="Content API")
     * @OA\Response(
     *     response=200,
     *     description="Upload file for content and return it",
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
     */
    #[Route(path: 'upload/file', name: 'uploadFile', methods: ['POST'])]
    public function uploadFile(
        #[CurrentUser] User $currentUser,
        #[RequestFile(field: 'file', constraints: [
            new NotNull(),
            new File(maxSize: '50M')
        ])] UploadedFile $file
    ): Response {
        $this->securityService->isVerification($currentUser);

        return $this->json($this->contentService->uploadFileForContent(user: $currentUser, file: $file));
    }
}
