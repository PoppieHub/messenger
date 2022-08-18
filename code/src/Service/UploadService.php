<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\UploadFileInvalidTypeException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Uid\Uuid;

class UploadService
{
    private const LINK_FILE_PATTERN = '/upload/usersDir/%s/%s';

    public function __construct(private Filesystem $filesystem, private string $uploadDir)
    {
    }

    public function uploadFile(User $user, UploadedFile $file): string
    {
        $extension = $file->guessExtension();

        if (null === $extension) {
            throw new UploadFileInvalidTypeException();
        }

        $uniqueName = Uuid::v4()->toRfc4122().'.'.$extension;

        $file->move($this->getUploadPath($user->getId()), $uniqueName);

        return sprintf(self::LINK_FILE_PATTERN, 'user_by_id_'.$user->getId(), $uniqueName);
    }

    public function deleteFile(string $userId, string $fileName): void
    {
        $this->filesystem->remove(
            $this->getUploadPath($userId).DIRECTORY_SEPARATOR.$fileName
        );
    }

    private function getUploadPath(int $id): string
    {
        return $this->uploadDir.DIRECTORY_SEPARATOR.'usersDir'.DIRECTORY_SEPARATOR.'user_by_id_'.$id;
    }
}
