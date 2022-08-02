<?php

namespace App\Controller;

use App\Repository\ChatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    public function __construct(private ChatRepository $chatRepository)
    {
    }

    #[Route('/')]
    public function root(): Response
    {
        $chats = $this->chatRepository->findAll();

        return $this->json($chats);
    }
}
