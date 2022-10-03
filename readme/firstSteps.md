[К содержанию](../readme.md)

## Преднастройка проекта

----

* В корне репозитория находится файл `.env.example`, данный фаил является примером, его необходимо переименовать в `.env`. 
  * Структура файла составляет:

     ```bash
     MYSQL_DATABASE=test
     MYSQL_ROOT_PASSWORD=test
     INSTALL_XDEBUG=true

     # Ключи для генерации jwt токенов
     MERCURE_PUBLISHER_JWT_KEY=mercure_publisher
     MERCURE_SUBSCRIBER_JWT_KEY=mercure_subscriber
     ```
     Опционально можно поменять настройки директив: 
       - Доступы к БД.
       - Mercure jwt ключи.

[Следующий шаг: Инструкция по развертыванию Docker и базовых команд](./dockerCommands.md)