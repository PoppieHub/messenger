[К содержанию](../readme.md)

## Настройка и развертывание

----

* Перейти в директорию `/app/backend`. В данной директории находится фаил `.env.example`, который является примером, его необходимо переименовать в `.env`. 
  - Необходимо опционально поменять настройки директив:
    - Подключение приложения к БД (Выбор docker контенера бд, логин, пароль).
      ```bash
        ###> doctrine/doctrine-bundle ###
        # DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
        DATABASE_URL="mysql://root:root@database:3306/messenger"
        # DATABASE_URL="postgresql://symfony:ChangeMe@127.0.0.1:5432/app?serverVersion=13&charset=utf8"
        ###< doctrine/doctrine-bundle ###
      ```
    - Отправщик фейковых email-ов.
      ```bash
        ###> symfony/mailer ###
        MAILER_DSN=smtp://mailhog:1025
        MAILER_URL="smtp://mailhog:1025?auth_mode=login"
        ###< symfony/mailer ###
      ```
* Дальше неообходимо установить все зависимости проекта и.
  - Необходимо перейти в php контейнер и выполнить следующие команды:
    - `composer install & composer update -W` - установит зависимости
    - `php bin/console doctrine:database:create` - создаст БД
    - `php bin/console doctrine:database:create --env=test` - создаст БД для тестовой БД
    - `php bin/console doctrine:migrations:migrate` - выполнит миграцию в БД (если есть в этом необходимость)
    - `php bin/console doctrine:migrations:migrate --env=test` - выполнит миграцию в тестовую БД (если есть в этом необходимость)

* В конфигурационном файле `/config/packages/lexik_jwt_authentication.yaml` в строчке `token_ttl`
находится директива со временем жизни JWT токена.

* В конфигурационном файле `/config/services.yaml` в строчке `emailGlobal`
находится директива с email отправителя.

[Следующий шаг: Базовая информация по приложению](./basicInfo.md)

