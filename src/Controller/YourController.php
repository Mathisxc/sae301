<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class YourController extends AbstractController
{
   #[Route('/your', name: 'app_your', methods: ['GET', 'POST'])]
   public function index(Request $request): Response
    {
        return $this->render('your/planning.html.twig', [
            'controller_name' => 'YourController',
        ]);
    }
    #[Route('/your/board', name: 'board')]
    public function board(): Response
    {
        return $this->render('your/board.html.twig');
    }

    #[Route('/your/indexchat', name: 'indexchat')]
    public function indexChat(): Response
    {
        return $this->render('your/indexchat.html.twig');
    }

    #[Route('/your/messagerie', name: 'messagerie')]
    public function messagerie(): Response
    {
        return $this->render('your/messagerie.html.twig');
    }

    #[Route('/your/planning', name: 'planning')]
    public function planning(): Response
    {
        return $this->render('your/planning.html.twig');
    }
}
