<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\CheckingException\UserReturnException;
use App\Model\SignUpRequest;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityService
{
    public function __construct(
        private UserPasswordHasherInterface $hasher,
        private EntityManagerInterface $em,
        private AuthenticationSuccessHandler $successHandler,
        private UserReturnException $userReturnException
    ) {
    }

    public function signUp(SignUpRequest $signUpRequest): Response
    {
        $this->userReturnException->checkUserExistenceOnNicknameAndEmail(
            nickname: $signUpRequest->getNickname(),
            email: $signUpRequest->getEmail()
        );

        $user = (new User())
            ->setEmail($signUpRequest->getEmail())
            ->setHideEmail(false)
            ->setNickname($signUpRequest->getNickname())
            ->setVerified(false);

        $user->setPassword($this->hasher->hashPassword($user, $signUpRequest->getPassword()));

        $this->em->persist($user);
        $this->em->flush();

        return $this->successHandler->handleAuthenticationSuccess($user);
    }
}
