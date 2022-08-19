<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\Content;
use App\Entity\Message;
use App\Entity\User;
use App\Model\ContentListItem;
use App\Exception\InvalidNumberOfMainImagesException;
use App\Model\ContentListResponse;
use App\Repository\ContentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ContentService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ContentRepository $contentRepository,
        private UploadService $uploadService
    )
    {
    }

    public function uploadFileForContent(User $user, UploadedFile $file, $avatarValue = false, Message $message = null, Chat $chat = null): ContentListItem
    {
        if ($avatarValue === true) {
            if (count($this->contentRepository->getContentForUser($user->getId(), true)) > 4) {
                throw new InvalidNumberOfMainImagesException();
            }
        }

        $link = $this->uploadService->uploadFile($user, $file);

        $content = (new Content())
            ->setUser($user)
            ->setChat($chat)
            ->setMessage($message)
            ->setAvatar($avatarValue)
            ->setLink($link);

        $this->em->persist($content);
        $this->em->flush();

        return self::map($content);
    }

    public function deleteFileForContent(User $user, string $idContent): void
    {
        $content = $this->contentRepository->findContentByUserAndId($user, $idContent);

        $fileName = $this->getFilename($content);

        $this->em->remove($content);
        $this->em->flush();

        $this->uploadService->deleteFile($user->getId(), $fileName);
    }

    public function getCollectionContent(array $collectionContent = null): ContentListResponse
    {
        if ($collectionContent === null) {
            return $collectionContent;
        }

        return new ContentListResponse(array_map(
            [$this, 'map'],
            $collectionContent
        ));
    }

    private function getFilename(Content $content): string
    {
        return basename($content->getLink());
    }

    private function map(Content $content): ContentListItem
    {
        return (new ContentListItem())
            ->setId($content->getId())
            ->setLink($content->getLink())
            ->setAvatar($content->isAvatar());
    }
}
