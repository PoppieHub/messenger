<?php

namespace App\Repository;

use App\Entity\Membership;
use App\Entity\Message;
use App\Entity\ReadMessage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
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

    public function findMessageById(string $id): Message|null
    {
        return $this->find($id);
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

    public function deleteMessagesByChatId(string $chatId): void
    {
        $db = $this->createQueryBuilder('m')
            ->delete()
            ->where('m.chat = :chatId')
            ->setParameter('chatId', $chatId);

        $query = $db->getQuery();
        $query->execute();
    }

    /**
     * @param string $searchValue
     * @param string $userId
     * @return Message[]
     */
    public function findMessagesByBodyMessageAndMembership(string $searchValue, string $userId): array
    {
        $db = $this->createQueryBuilder('m')
            ->select('m')
            ->where('m.body_message LIKE :searchValue AND ms.user = :userId')
            ->innerJoin(Membership::class, 'ms', 'with', 'ms.chat = m.chat')
            ->setParameter('searchValue', '%'.'"message":'.'%'.$searchValue.'%'.'"replyMessage":'.'%')
            ->setParameter('userId', $userId)
            ->orderBy('m.created_at', 'DESC')
            ->groupBy('m.id')
        ;

        $query = $db->getQuery();
        return $query->execute();
    }
}
