<?php

namespace App\Repository;

use App\Entity\Content;
use App\Exception\ContentNotFoundException;
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

    public function getContentForUser(string $userId, bool $avatar): array
    {
        $db = $this->createQueryBuilder('c')
            ->where('c.user = :idU AND c.avatar = :avatar')
            ->setParameter('idU', $userId)
            ->setParameter('avatar', $avatar)
            ->orderBy('c.id', 'ASC')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }

    public function findContentByUserAndId(UserInterface $user, string $idContent): Content
    {
        $content = $this->findOneBy(['id' => $idContent, 'user' => $user]);

        if (null === $content) {
            throw new ContentNotFoundException();
        }

        return $content;
    }
}
