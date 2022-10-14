<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\CheckingException\UserReturnException;
use App\Model\SignUpRequest;
use App\Repository\RefreshTokenRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class SecurityService
{
    public function __construct(
        private string $globalEmail,
        private UserPasswordHasherInterface $hasher,
        private EntityManagerInterface $em,
        private AuthenticationSuccessHandler $successHandler,
        private UserReturnException $userReturnException,
        private SendMailService $sendMailService,
        private UserRepository $userRepository,
        private RefreshTokenRepository $refreshTokenRepository,
        private EntityManagerInterface $entityManager,
        private UrlGeneratorInterface $urlGenerator,
        private TokenGeneratorInterface $tokenGenerator
    ) {
    }

    // Константа, на основании которой генерируются случайная строка
    private const permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
            ->setFirstName(null)
            ->setLastName(null)
            ->setVerified(false);

        $user->setPassword($this->hasher->hashPassword($user, $signUpRequest->getPassword()));

        $this->em->persist($user);
        $this->em->flush();

        $token = $this->successHandler->handleAuthenticationSuccess($user);
        $tokenArray = json_decode($token->getContent());

        $this->sendMailService->send(
            from: $this->globalEmail,
            to: $user->getEmail(),
            subject: 'Activating your messenger account',
            template: 'register',
            context: compact('user', 'tokenArray')
        );

        return $token;
    }

    public function isVerification(User $user): void
    {
        if (!empty($user)) {
            $this->userReturnException->checkIsVerifiedUser($user->isVerified());
        }
    }

    public function forgotPassword(string $email, string $nickname): bool
    {
        $user = $this->userRepository->findUsersByEmailAndNickname(email: $email, nickname: $nickname);
        $this->userReturnException->checkUserOnEmpty($user);

        $token = $this->tokenGenerator->generateToken();

        $user->setResetToken($token);
        $this->em->persist($user);
        $this->em->flush();

        // Создается ссылка на экшен в SecurityController для сброса пароля
        $url = $this->urlGenerator->generate('security.resetPassword', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_PATH);

        // Cоздаем данные электронной почты
        $context = compact('url', 'user');

        $this->sendMailService->send(
            from: $this->globalEmail,
            to: $user->getEmail(),
            subject: 'Password reset',
            template: 'password_reset',
            context: $context
        );

        return true;
    }

    public function resetPassword(string $token): bool
    {
        if (mb_strlen($token) > 5) {
            $user = $this->userRepository->findUsersByResetToken($token);
            $this->userReturnException->checkUserOnEmpty($user);

            $newPassword = self::generateString(self::permitted_chars);

            $this->refreshTokenRepository->deleteRefreshTokensForUserId($user->getId());

            $user->setPassword($this->hasher->hashPassword($user, $newPassword));
            $this->em->persist($user);
            $this->em->flush();

            $this->sendMailService->send(
                from: $this->globalEmail,
                to: $user->getEmail(),
                subject: 'Password updated',
                template: 'authentication_data_update',
                context: compact('user', 'newPassword')
            );

            return true;
        }

        return false;
    }

    public function acceptVerification(string $token): bool
    {
        if (self::isValid($token) && self::isExpired($token)) {
            $userId = self::getPayload($token)['id'];
            $user = $this->userRepository->findUserById($userId);

            $this->userReturnException->checkUserOnEmpty($user);

            if ($user->isVerified() !== true) {
                $user->setVerified(true);

                $this->em->persist($user);
                $this->em->flush();

                return true;
            }
        }

        return false;
    }

    private static function generateString(string $input, int $strength = 16): string
    {
        $input_length = strlen($input);
        $random_string = '';
        for ($i = 0; $i < $strength; $i++) {
            $random_character = $input[mt_rand(0, $input_length - 1)];
            $random_string .= $random_character;
        }

        return $random_string;
    }

    //Проверяем, что токен валидный (правильно сформированный)
    private static function isValid(string $token): bool
    {
        return preg_match('/^[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+\.[a-zA-Z0-9\-\_\=]+$/', $token) === 1;
    }

    // Проверке истечения срока действия (к сроку жизни токена добавляем 2 часа 50 минут)
    private static function isExpired(string $token): bool
    {
        $payload = self::getPayload($token);

        $now = new DateTimeImmutable();

        return $payload['exp'] + 10200 > $now->getTimestamp();
    }

    // Получаем Payload
    private static function getPayload(string $token): array
    {
        $array = explode('.', $token);

        // Расшифровываем Payload
        return json_decode(base64_decode($array[1]), true);
    }

    // Получаем заголовок
    private static function getHeader(string $token): array
    {
        $array = explode('.', $token);

        // Расшифровываем заголовок
        return json_decode(base64_decode($array[0]), true);
    }
}
