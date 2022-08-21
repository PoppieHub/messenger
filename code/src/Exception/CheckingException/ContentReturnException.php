<?php

namespace App\Exception\CheckingException;

use App\Entity\Content;
use App\Exception\ContentNotFoundException;
use App\Exception\InvalidNumberOfMainImagesException;
use App\Exception\UploadFileInvalidTypeException;
use App\Repository\ContentRepository;

class ContentReturnException
{
    public function __construct(private ContentRepository $contentRepository)
    {
    }

    public function checkUploadAvatarAvailability(string $userId): void
    {
        if (count($this->contentRepository->getContentForUser($userId, true)) > 4) {
            throw new InvalidNumberOfMainImagesException();
        }
    }

    public function checkThatTheContentIsNotNull(Content|null $content): void
    {
        if (null === $content) {
            throw new ContentNotFoundException();
        }
    }

    public function checkUploadExtension(string|null $extension): void
    {
        if ($extension === null) {
            throw new UploadFileInvalidTypeException();
        }
    }
}
