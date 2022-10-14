<?php

namespace App\Repository;

use App\Entity\Content;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @extends ServiceEntityRepository<Content>
 *
 * @method Content|null find($id, $lockMode = null, $lockVersion = null)
 * @method Content|null findOneBy(array $criteria, array $orderBy = null)
 * @method Content[]    findAll()
 * @method Content[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Content::class);
    }

    public function getAvatarForUser(string $userId, bool $avatar): array
    {
        $db = $this->createQueryBuilder('c')
            ->where('c.user = :userId AND 
            (c.chat IS NULL) AND
            c.avatar = :avatar')
            ->setParameter('userId', $userId)
            ->setParameter('avatar', $avatar)
            ->orderBy('c.id', 'ASC')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }

    public function getContentsForChat(null|string $chatId, bool $avatar): array
    {
        $db = $this->createQueryBuilder('c')
            ->where('
            c.chat = :chatId AND 
            c.avatar = :avatar')
            ->setParameter('chatId', $chatId)
            ->setParameter('avatar', $avatar)
            ->orderBy('c.id', 'ASC')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }

    public function findContentByUserAndId(UserInterface $user, string $idContent): Content|null
    {
        return $this->findOneBy(['id' => $idContent, 'user' => $user]);
    }
}
