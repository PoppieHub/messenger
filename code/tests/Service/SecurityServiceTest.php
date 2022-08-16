<?php

namespace App\Tests\Service;

use App\Entity\User;
use App\Exception\UserAlreadyExistsException;
use App\Model\SignUpRequest;
use App\Repository\UserRepository;
use App\Service\SecurityService;
use App\Tests\AbstractTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;

class SecurityServiceTest extends AbstractTestCase
{
    private UserPasswordHasher $hasher;

    private UserRepository $userRepository;

    private EntityManagerInterface $em;

    private AuthenticationSuccessHandler $successHandler;

    protected function setUp(): void
    {
        parent::setUp();

        $this->hasher = $this->createMock(UserPasswordHasher::class);
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->em = $this->createMock(EntityManagerInterface::class);
        $this->successHandler = $this->createMock(AuthenticationSuccessHandler::class);
    }

    private function createService(): SecurityService
    {
        return new SecurityService($this->hasher, $this->userRepository, $this->em, $this->successHandler);
    }

    public function testSignUpUserAlreadyExists(): void
    {
        $this->expectException(UserAlreadyExistsException::class);

        $this->userRepository->expects($this->once())
            ->method('existsByEmail')
            ->with('test@test.com')
            ->willReturn(true);

        $this->userRepository->expects($this->once())
            ->method('existsByNickname')
            ->with('testNickname')
            ->willReturn(true);

        $this->createService()->signUp((new SignUpRequest())
            ->setEmail('test@test.com')
            ->setNickname('testNickname')
            ->setPassword('12345678')
            ->setConfirmPassword('12345678'));
    }
    public function testSignUp(): void
    {
        $response = new Response();
        $expectedHasherUser = (new User())
            ->setEmail('test@test.com')
            ->setNickname('testNickname')
            ->setHideEmail(false)
            ->setVerified(false);

        $expectedUser = clone $expectedHasherUser;
        $expectedUser->setPassword('hashed_password');

        $this->userRepository->expects($this->once())
            ->method('existsByEmail')
            ->with('test@test.com')
            ->willReturn(false);

        $this->hasher->expects($this->once())
            ->method('hashPassword')
            ->with($expectedHasherUser, 'testtest')
            ->willReturn('hashed_password');

        $this->em->expects($this->once())->method('persist')->with($expectedUser);
        $this->em->expects($this->once())->method('flush');

        $this->successHandler->expects($this->once())
            ->method('handleAuthenticationSuccess')
            ->with($expectedUser)
            ->willReturn($response);

        $signUpRequest = (new SignUpRequest())
            ->setNickname('testNickname')
            ->setEmail('test@test.com')
            ->setPassword('testtest');

        $this->assertEquals($response, $this->createService()->signUp($signUpRequest));
    }
}
