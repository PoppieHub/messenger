<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 *
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    /**
     * @param string $chatId
     * @return Message[]
     */
    public function findMessagesByChatId(string $chatId): array
    {
        $db = $this->createQueryBuilder('m')
            ->where('m.chat = :idC')
            ->setParameter('idC', $chatId)
            ->orderBy('m.created_at', 'ASC')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }
}
