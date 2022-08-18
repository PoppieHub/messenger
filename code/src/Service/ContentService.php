<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\Content;
use App\Entity\Message;
use App\Entity\User;
use App\Model\ContentListItem;
use App\Exception\InvalidNumberOfMainImagesException;
use App\Repository\ContentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ContentService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ContentRepository $contentRepository,
        private UploadService $uploadService,
        private UserService $userService,
        private MessageService $messageService,
        private ChatService $chatService
    ) {
    }

    public function uploadFileForContent(User $user, UploadedFile $file, $avatarValue = false, Message $message = null, Chat $chat = null): ContentListItem
    {
        if ($avatarValue === true) {
            if (count($this->contentRepository->getContentForUser($user->getId(), $avatarValue)) > 4) {
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

        return $this->getContent($user, $avatarValue, $message, $chat, $link);
    }

    public function deleteFileForContent(User $user, string $idContent): void
    {
        $content = $this->contentRepository->findContentByUserAndId($user, $idContent);

        $fileName = $this->getFilename($content);

        $this->em->remove($content);
        $this->em->flush();

        $this->uploadService->deleteFile($user->getId(), $fileName);
    }

    public function getContent(User $user, bool $avatarValue, Message $message = null, Chat $chat = null, string $link): ContentListItem
    {
        $contentListItem= (new ContentListItem)
            ->setUser($this->userService->getShortProfile($user))
            ->setAvatar($avatarValue)
            ->setLink($link);

        if ($message !== null) {
            $contentListItem->setMessage(
                $this->messageService->getMessage($message)
            );
        }

        if ($chat !== null) {
            $contentListItem->setChat(
                $this->chatService->getChat($chat)
            );
        }

        return $contentListItem;
    }

    private function getFilename(Content $content): string
    {
        return basename($content->getLink());
    }
}
