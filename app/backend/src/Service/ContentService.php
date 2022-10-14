<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\Content;
use App\Entity\User;
use App\Exception\CheckingException\ChatReturnException;
use App\Exception\CheckingException\ContentReturnException;
use App\Exception\CheckingException\MembershipReturnException;
use App\Model\ContentListItem;
use App\Model\ContentListResponse;
use App\Repository\ContentRepository;
use App\Repository\MembershipRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ContentService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ContentRepository $contentRepository,
        private UploadService $uploadService,
        private ContentReturnException $contentReturnException,
        private MembershipRepository $membershipRepository,
        private MembershipReturnException $membershipReturnException,
        private ChatReturnException $chatReturnException
    ) {
    }

    public function uploadFileForContent(User $user, UploadedFile $file, $avatarValue = false, Chat $chat = null): ContentListItem
    {
        if ($avatarValue && !empty($user)) {
            $this->contentReturnException->checkUploadAvatarAvailability(userId: $user->getId());
        }

        if ($avatarValue && !empty($chat)) {
            $this->contentReturnException->checkUploadAvatarAvailabilityForChat(chatId: $chat->getId());
        }

        if ($chat !== null) {
            $this->chatReturnException->checkExistsChat($chat);

            $this->membershipReturnException->checkExistsMembership(
                $this->membershipRepository->findMembership(userId: $user->getId(), chatId: $chat->getId())
            );
        }

        $link = $this->uploadService->uploadFile($user, $file);

        $content = (new Content())
            ->setUser($user)
            ->setChat($chat)
            ->setAvatar($avatarValue)
            ->setLink($link);

        $this->em->persist($content);
        $this->em->flush();

        return self::map($content);
    }

    public function deleteCollectionFiles(User $user, ?Collection $collection): void
    {
        if (!empty($collection)) {
            array_map(
                fn (Content $content) => $this->deleteFile(content: $content, user: $user),
                $collection->getValues()
            );
        }
    }

    private function deleteFile(Content $content, User $user): void
    {
        $this->uploadService->deleteFile($user->getId(), $this->getFilename($content));
    }

    public function deleteFileForContent(User $user, string $idContent): void
    {
        $content = $this->contentRepository->findContentByUserAndId($user, $idContent);
        $this->contentReturnException->checkThatTheContentIsNotNull(content: $content);

        $this->deleteFile(content: $content, user: $user);

        $this->em->remove($content);
        $this->em->flush();
    }

    public function getCollectionContent(array $collectionContent = null, string $mapMethod = 'map'): ContentListResponse
    {
        if ($collectionContent === null) {
            return new ContentListResponse([]);
        }

        return new ContentListResponse(array_map(
            [$this, $mapMethod],
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

    private function getContentByArray(array $content): ContentListItem
    {
        return (new ContentListItem())
            ->setId(($content['id'])? $content['id']: null)
            ->setLink($content['link'])
            ->setAvatar(($content['avatar'])? $content['avatar']: null);
    }
}
