<?php

namespace App\Repository;

use App\Entity\User;
use App\Exception\UserNotFoundException;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function existsByEmail(string $email): bool
    {
        return null !== $this->findOneBy(['email' => $email]);
    }

    public function existsByNickname(string $nickname): bool
    {
        return null !== $this->findOneBy(['nickname' => $nickname]);
    }

    public function findUserById(string $userId): User|null
    {
        return $this->find($userId);
    }

    public function findUsersByEmailOrNickname(string $searchValue, int $userId, bool $hide_email = false, bool $verified = true): array
    {
        $db = $this->createQueryBuilder('u')
            ->where('
                u.id != :idU AND (
                    (u.hide_email = :hide_emailU AND u.email LIKE :searchValueU)
                    OR u.nickname LIKE :searchValueU) AND 
                u.verified = :verifiedU')
            ->setParameter('searchValueU', '%'.$searchValue.'%')
            ->setParameter('idU', $userId)
            ->setParameter('verifiedU', $verified)
            ->setParameter('hide_emailU', $hide_email)
            ->orderBy('u.id', 'ASC')
            ->groupBy('u.id')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }
}
