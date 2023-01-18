<?php

namespace App\Repository;

use App\Entity\Membership;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Membership>
 *
 * @method Membership|null find($id, $lockMode = null, $lockVersion = null)
 * @method Membership|null findOneBy(array $criteria, array $orderBy = null)
 * @method Membership[]    findAll()
 * @method Membership[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MembershipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Membership::class);
    }

    public function findMembershipById(string $membershipId): Membership|null
    {
        return $this->find($membershipId);
    }

    public function findMembership(string $userId, string $chatId): Membership|null
    {
        return $this->findOneBy(['user' => $userId, 'chat' => $chatId]);
    }

    public function findFirstMembershipByChatId(string $chatId): Membership|null
    {
        $db = $this->createQueryBuilder('membership')
            ->select('membership')
            ->where('membership.chat = :chatId')
            ->setParameter('chatId', $chatId)
            ->orderBy('membership.id', 'ASC')
            ->setMaxResults(1);

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }

    public function deleteMembershipsByChatId(string $chatId): int|null
    {
        $db = $this->createQueryBuilder('membership')
            ->delete()
            ->where('membership.chat = :chatId')
            ->setParameter('chatId', $chatId);

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }

    /**
     * @return Membership[]
     */
    public function getMembershipsForChat(string $chatId): array
    {
        $db = $this->createQueryBuilder('membership')
            ->select('membership')
            ->where('membership.chat = :chatId')
            ->setParameter('chatId', $chatId)
            ->orderBy('membership.id', 'ASC')
            ->groupBy('membership.id');

        $query = $db->getQuery();
        return $query->execute();
    }
}
