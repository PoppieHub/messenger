<?php

namespace App\Repository;

use App\Entity\ReadMessage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ReadMessage>
 *
 * @method ReadMessage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReadMessage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReadMessage[]    findAll()
 * @method ReadMessage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReadMessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ReadMessage::class);
    }

    public function deleteRead(string $userId, string $messageId): void
    {
        $db = $this->createQueryBuilder('r')
            ->delete()
            ->where('r.user = :userId AND r.message = :messageId')
            ->setParameter('userId', $userId)
            ->setParameter('messageId', $messageId);

        $query = $db->getQuery();
        $query->execute();
    }

    public function existsReadMessage(string $userId, string $messageId): ReadMessage|null
    {
        return $this->findOneBy(['user' => $userId, 'message' => $messageId]);
    }
}
