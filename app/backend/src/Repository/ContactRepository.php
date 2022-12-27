<?php

namespace App\Repository;

use App\Entity\Contact;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Contact>
 *
 * @method Contact|null find($id, $lockMode = null, $lockVersion = null)
 * @method Contact|null findOneBy(array $criteria, array $orderBy = null)
 * @method Contact[]    findAll()
 * @method Contact[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContactRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Contact::class);
    }

    public function recordByWithTwoUsers(string $firstUser, string $secondUser): Contact|null
    {
        $db = $this->createQueryBuilder('contact')
            ->where('(
            contact.from_user = :firstUser AND contact.to_user = :secondUser) OR (
            contact.to_user = :firstUser AND contact.from_user = :secondUser)')
            ->setParameter('firstUser', $firstUser)
            ->setParameter('secondUser', $secondUser)
        ;

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }

    public function findRecordByContactIdAndUserId(string $contactId, string $userId): Contact|null
    {
        $db = $this->createQueryBuilder('contact')
            ->where('(
            contact.from_user = :userId AND contact.id = :contactId) OR (
            contact.to_user = :userId AND contact.id = :contactId)')
            ->setParameter('userId', $userId)
            ->setParameter('contactId', $contactId)
        ;

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }

    public function findByContactIdAndFromUser(string $contactId, string $userId): Contact|null
    {
        $db = $this->createQueryBuilder('contact')
            ->where('contact.to_user = :userId AND contact.id = :contactId')
            ->setParameter('userId', $userId)
            ->setParameter('contactId', $contactId)
        ;

        $query = $db->getQuery();

        try {
            return $query->getOneOrNullResult();
        } catch (NonUniqueResultException $e) {
            return null;
        }
    }

    public function findRecordsByUser(string $userId): array
    {
        $db = $this->createQueryBuilder('contact')
            ->select('contact')
            ->where('contact.from_user = :userId OR contact.to_user = :userId')
            ->setParameter('userId', $userId)
            ->orderBy('contact.status', 'ASC')
            ->addOrderBy('contact.id')
        ;

        $query = $db->getQuery();

        return $query->execute();
    }
}
