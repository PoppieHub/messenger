<?php

namespace App\Repository;

use App\Entity\Chat;
use App\Entity\Membership;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Chat>
 *
 * @method Chat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chat[]    findAll()
 * @method Chat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chat::class);
    }

    public function findChatById(string $id): Chat|null
    {
        return $this->find($id);
    }

    /**
     * @return Chat[]
     */
    public function getChatsForUser(string $userId): array
    {
        $db = $this->createQueryBuilder('chat')
            ->select('chat')
            ->where('user.id = :userId')
            ->innerJoin(Membership::class, 'membership', 'with', 'membership.chat = chat.id')
            ->leftJoin('membership.user', 'user')
            ->setParameter('userId', $userId)
            ->orderBy('chat.name', 'ASC')
            ->groupBy('chat.id');

        $query = $db->getQuery();
        return $query->execute();
    }

    public function findChatOfTwoUsers(string $firstUserId, string $secondUserId, bool $multiChat): Chat|null
    {
        $db = $this->createQueryBuilder('chat')
            ->select('chat')
            ->where('chat.multiChat = :multiChat AND membershipFirst.user = :firstUserId')
            ->andWhere('chat.multiChat = :multiChat AND membershipSecond.user = :secondUserId')
            ->innerJoin(Membership::class, 'membershipFirst', 'with', 'membershipFirst.chat = chat.id')
            ->innerJoin(Membership::class, 'membershipSecond', 'with', 'membershipSecond.chat = chat.id')
            ->setParameter('firstUserId', $firstUserId)
            ->setParameter('secondUserId', $secondUserId)
            ->setParameter('multiChat', $multiChat)
        ;

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }
}
