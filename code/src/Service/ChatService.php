<?php

namespace App\Service;

use App\Entity\Chat;
use App\Entity\User;
use App\Exception\CheckingException\ChatReturnException;
use App\Exception\CheckingException\MembershipReturnException;
use App\Exception\CheckingException\UserReturnException;
use App\Model\ChatsListItem;
use App\Model\ChatsListResponse;
use App\Model\ContentListItem;
use App\Repository\ChatRepository;
use App\Repository\ContentRepository;
use App\Repository\MembershipRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ChatService
{
    public function __construct(
        private EntityManagerInterface $em,
        private ChatRepository $chatRepository,
        private UserReturnException $userReturnException,
        private ContentService $contentService,
        private MembershipService $membershipService,
        private ContentRepository $contentRepository,
        private ChatReturnException $chatReturnException,
        private MembershipReturnException $membershipReturnException,
        private MembershipRepository $membershipRepository,
        private UserRepository $userRepository
    ) {
    }

    public function getDefaultChat(User $currentUser, string $otherUserId): ChatsListItem
    {
        $chat = $this->chatRepository->findChatOfTwoUsers(firstUserId: $currentUser->getId(), secondUserId: $otherUserId, multiChat: false);

        if ($chat === null) {
            $otherUser = $this->userRepository->findUserById($otherUserId);

            $this->userReturnException->checkUserOnEmpty($otherUser);

            $chat = $this->createChat();

            $this->membershipService->setMembershipForChat(userWhoIsChatting: $currentUser, addedUser: $currentUser, chat: $chat, isNewChat: true);
            $this->membershipService->setMembershipForChat(userWhoIsChatting: $otherUser, addedUser: $otherUser, chat: $chat, isNewChat: true);
        }

        return $this->getChat(chat: $chat);
    }

    public function getListChats(User $user): ChatsListResponse
    {
        $this->userReturnException->checkUserOnEmpty(user: $user);

        return $this->getCollectionChats(
            collectionChats: $this->chatRepository->getChatsForUser($user->getId())
        );
    }

    public function createMultiChat(User $currentUser, string $name, string $description = null): ChatsListItem
    {
        $chat = $this->createChat(name: $name, description: $description, multiChat: true);

        $this->membershipService->setMembershipForChat(userWhoIsChatting: $currentUser, addedUser: $currentUser, chat: $chat, isNewChat: true);

        return $this->getChat($chat);
    }

    public function updateMultiChat(User $currentUser, string $chatId, string $name = null, string $description = null): ChatsListItem
    {
        $chat = $this->chatRepository->findChatById($chatId);

        $this->chatReturnException->checkExistsChat($chat);
        $this->chatReturnException->checkNotIsChatMulti($chat);
        $this->membershipReturnException->checkExistsMembership(
            $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chat->getId())
        );

        if (!empty($name)) {
            $chat->setName($name);
        }
        if (!empty($description !== null)) {
            $chat->setDescription($description);
        }

        $this->em->flush();

        return $this->getChat($chat);
    }

    public function createChat(string $name = 'Default Chat', string $description = null, bool $multiChat = false): Chat
    {
        $chat = (new Chat())
            ->setName($name)
            ->setDescription($description)
            ->setMultiChat($multiChat);

        $this->em->persist($chat);
        $this->em->flush();

        return $chat;
    }

    public function uploadAvatar(User $user, UploadedFile $file, string $chatId): ContentListItem
    {
        $chat = $this->chatRepository->findChatById($chatId);

        return $this->contentService->uploadFileForContent(user: $user, file: $file, avatarValue: true, chat: $chat);
    }

    public function deleteChat(User $currentUser, string $chatId): bool
    {
        $chat = $this->chatRepository->findChatById($chatId);
        $this->chatReturnException->checkExistsChat($chat);

        $this->membershipReturnException->checkExistsMembership(
            $this->membershipRepository->findMembership(userId: $currentUser->getId(), chatId: $chatId)
        );

        $this->membershipService->deleteMemberships(currentUser: $currentUser, chat: $chat);

        $this->em->remove($chat);
        $this->em->flush();

        return true;
    }

    public function getCollectionChats(array $collectionChats): ChatsListResponse
    {
        return new ChatsListResponse(array_map(
            fn (Chat $chat) => $this->getChat(chat: $chat),
            $collectionChats
        ));
    }

    public function getChat(Chat $chat): ChatsListItem
    {
        return (new ChatsListItem())
            ->setId($chat->getId())
            ->setName($chat->getName())
            ->setDescription($chat->getDescription())
            ->setMultiChat($chat->isMultiChat())
            ->setMembership(
                (!empty($chat->getMemberships()))?
                    $this->membershipService->getCollectionMembership(
                        $chat->getMemberships()->toArray()
                    ) : null
            )
            ->setContent(
                $this->contentService->getCollectionContent(
                    $this->contentRepository->getContentsForChat(
                        chatId: $chat->getId(),
                        avatar: true
                    )
                )
            );
    }
}
