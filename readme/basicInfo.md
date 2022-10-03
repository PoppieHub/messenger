[К содержанию](../readme.md)

## Базовая информация по приложению

----

* Пример базовых POST запросов для приложения:
  - Регистрации нововго пользователя:
    ```bash 
      curl -XPOST -H "Content-Type: application/json" http://messenger.local:80/api/v1/auth/signUp --data '{"nickname":"johndoe4","email":"test4@test.com","password":"testtesttest", "confirmPassword":"testtesttest"}' 
    ```
  - Логирование пользователя:
    ```bash
      curl -XPOST -H "Content-Type: application/json" http://messenger.local:80/api/v1/auth/login --data '{"username":"test4@test.com","password":"testtesttest"}'
    ```
  - Обновить токен:
    ```bash
      curl -XPOST -d refresh_token="a7626bc7011aa28e8597345da5021d6c320a202710c0b9ed689454b155db0ce822f4786588713d89ee5678d7273b6050deeda7646d2713cfa5dab343e9d84079" 'http://messenger.local:80/api/v1/auth/refresh'
    ```
  - Загрузить контент:
    ```bash
      curl -XPOST http://messenger.local:80/api/v1/user/uploadAvatar/ -F 'avatar=@/Users/poppie/Downloads/AIt5-EV8j9g.jpg' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjA3OTA2NTcsImV4cCI6MTY2MDc5MTI1Nywicm9sZXMiOltdLCJ1c2VybmFtZSI6InVzZXJFbWFpbEB0ZXN0LmNvbSIsImlkIjoiMSJ9.kOHOf377Ln2MN0SJiFFmkTcjdK0H5N5tSXx4YNRNeJQAz4THgVY_MlvOiMjTFcydLQ9ri5femnfqD7GvIqRWZU4NOJiUHxE2Uqadn8iKgciQKJEzT9PjZeBzq9tEgnCbBTy7_KgzM9U5QZhKZNsgUrQb3hJo9G1lkf-g7vfbFmdQFx1zG8ROBanP9pzIdz30PnphSjxzogxilBs6aUT_DgqHZGm6IcQCvQWSt65BrmaoaqtUVWqpZYtQouuTHud5TFRTl1yApzm-OSk3Q4km9ED96o55WCeUyZPktAwvQyDdR15PDFKMI2k1fU_GkBh8vQq6jAYaT6wiLgezwQKqZg'    
    ```

* По роуту http://messenger.local/api/doc находится Swagger c описанием api, схемами и исключениями (нужна авторизация JWT).
* По роуту http://messenger.local:8025/ находится фейковый почтовый ящик (для верификации, сброса пароля).
  * По роуту http://messenger.local:81 находится phpmyadmin (логин и пароль от бд).

### Логика БД:
![](./img.png)