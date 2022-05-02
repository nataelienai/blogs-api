# Blogs API

Blogs API é uma API REST de gerenciamento de postagens, pela qual é possível criar, visualizar, categorizar, atualizar e excluir postagens. Cada postagem pode possuir várias categorias e é pertencente a somente um usuário, sendo necessário que este se cadastre na aplicação para poder criá-las.

## Tecnologias utilizadas

Desenvolvido utilizando o framework [Express](https://expressjs.com/), o Object-Relational Mapper (ORM) [Sequelize](https://sequelize.org/) e o banco de dados [MySQL](https://www.mysql.com/). Inclusive, a autenticação é realizada através de JSON Web Tokens (JWTs), que são fornecidos no cadastro ou no login.

## Instalação das dependências

Você precisará das tecnologias de conteinerização [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina para executar a aplicação.

Após clonar o repositório, abra o terminal e siga os seguintes passos:

1. Entre na pasta do repositório:

```sh
cd project-blogs-api
```

2. Copie `.env.example` para `.env`:

```sh
cp .env.example .env
```

## Como executar a aplicação

Dentro da pasta do repositório, execute no terminal:

```sh
docker-compose up
```

Então, aguarde até que apareça a mensagem:

```sh
app_1 | ouvindo porta 3000!
```

Para encerrar a aplicação, pressione as teclas `ctrl + C`.

Acesse a [documentação da linha de comando do Docker Compose](https://docs.docker.com/engine/reference/commandline/compose/#child-commands) para saber mais sobre os comandos disponíveis.

## Documentação

### Login

Realiza login com o email e a senha de uma pessoa usuária cadastrada.

O corpo da resposta contém um **objeto JSON** com o token de autenticação gerado.

#### URL

```
POST http://localhost:3000/login
```

#### Parâmetros

##### Body

| Parâmetro | Tipo   | Descrição                                 |
| :-------- | :----- | :---------------------------------------- |
| email     | string | Email da pessoa usuária. **Obrigatório**. |
| password  | string | Senha da pessoa usuária. **Obrigatório**. |

#### Campos da resposta

| Campo | Tipo   | Descrição              |
| :---- | :----- | :--------------------- |
| token | string | Token de autenticação. |

#### Códigos de status da resposta

| Código | Descrição                                 |
| :----- | :---------------------------------------- |
| 200    | Token de autenticação gerado com sucesso. |
| 400    | Parâmetro ausente ou inválido.            |

#### Exemplo

Requisição:

```sh
curl --request POST http://localhost:3000/login \
--header 'Content-Type: application/json' \
--data '{
  "email": "user@email.com",
  "password": "123456"
}'
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNDYxMzMzLCJleHAiOjE2NTE0NjQ5MzN9.BLxSLnsNoi9UQX6gjMgpR3Gp2jcjThIzWaQcwOc9M2Y"
}
```

---

### Criar pessoa usuária

Cria uma pessoa usuária.

O corpo da resposta contém um **objeto JSON** com o token de autenticação gerado.

#### URL

```
POST http://localhost:3000/user
```

#### Parâmetros

##### Body

| Parâmetro   | Tipo   | Descrição                                                                  |
| :---------- | :----- | :------------------------------------------------------------------------- |
| displayName | string | Nome de exibição da pessoa usuária. **Obrigatório**. Mínimo: 8 caracteres. |
| email       | string | Email no formato "email@example.com". **Obrigatório**.                     |
| password    | string | Senha da pessoa usuária. **Obrigatório**. Mínimo: 6 caracteres.            |
| image       | string | URL da imagem da pessoa usuária.                                           |

#### Campos da resposta

| Campo | Tipo   | Descrição              |
| :---- | :----- | :--------------------- |
| token | string | Token de autenticação. |

#### Códigos de status da resposta

| Código | Descrição                          |
| :----- | :--------------------------------- |
| 201    | Pessoa usuária criada com sucesso. |
| 400    | Parâmetro ausente ou inválido.     |
| 409    | Email já registrado.               |

#### Exemplo

Requisição:

```sh
curl --request POST http://localhost:3000/user \
--header 'Content-Type: application/json' \
--data '{
  "displayName": "user name",
  "email": "user@email.com",
  "password": "123456"
}'
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNDYyOTQyLCJleHAiOjE2NTE0NjY1NDJ9.opcHShA0JlVTuQT5rt8xFSiuX9FnQdd_Q1DXyW_jXsg"
}
```

---

### Buscar pessoas usuárias

Busca todos as pessoas usuárias cadastradas.

O corpo da resposta contém um **array JSON** com informações das pessoas usuárias.

#### URL

```
GET http://localhost:3000/user
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

Nenhum.

#### Campos da resposta

| Campo       | Tipo    | Descrição                           |
| :---------- | :------ | :---------------------------------- |
| id          | inteiro | ID da pessoa usuária.               |
| displayName | string  | Nome de exibição da pessoa usuária. |
| email       | string  | Email da pessoa usuária.            |
| image       | string  | URL da imagem da pessoa usuária.    |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Pessoas usuárias retornadas com sucesso.    |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/user \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNDYyOTQyLCJleHAiOjE2NTE0NjY1NDJ9.opcHShA0JlVTuQT5rt8xFSiuX9FnQdd_Q1DXyW_jXsg'
```

Resposta:

```json
[
  {
    "id": 1,
    "displayName": "user name",
    "email": "user@email.com",
    "image": ""
  }
]
```

---

### Buscar pessoa usuária

Busca uma pessoa usuária especificada pelo seu ID.

O corpo da resposta contém um **objeto JSON** com informações da pessoa usuária.

#### URL

```
GET http://localhost:3000/user/{id}
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Path

| Campo | Tipo    | Descrição                           |
| :---- | :------ | :---------------------------------- |
| id    | inteiro | ID da pessoa usuária a ser buscada. |

#### Campos da resposta

| Campo       | Tipo    | Descrição                           |
| :---------- | :------ | :---------------------------------- |
| id          | inteiro | ID da pessoa usuária.               |
| displayName | string  | Nome de exibição da pessoa usuária. |
| email       | string  | Email da pessoa usuária.            |
| image       | string  | URL da imagem da pessoa usuária.    |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Pessoa usuária retornada com sucesso.       |
| 401    | Token de autenticação inválido ou expirado. |
| 404    | Pessoa usuária não existe.                  |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/user/1 \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTE1NDg3LCJleHAiOjE2NTE1MTkwODd9.LPmyGAVKCBefyZDIuay_eMwjUKDSpBsCE-tyov7hwCQ'
```

Resposta:

```json
{
  "id": 1,
  "displayName": "user name",
  "email": "user@email.com",
  "image": ""
}
```

---

### Excluir usuário

Exclui o usuário especificado pelo seu token de autenticação.

A resposta não possui conteúdo em seu corpo.

#### URL

```
DELETE http://localhost:3000/user/me
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

Nenhum.

#### Campos da resposta

Nenhum.

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 204    | Pessoa usuária excluída com sucesso.        |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --head --request DELETE http://localhost:3000/user/me \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNDYyOTQyLCJleHAiOjE2NTE0NjY1NDJ9.opcHShA0JlVTuQT5rt8xFSiuX9FnQdd_Q1DXyW_jXsg'
```

Resposta:

```sh
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Mon, 02 May 2022 04:08:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

---

### Criar categoria

Cria uma categoria.

O corpo da resposta contém um **objeto JSON** com informações da categoria criada.

#### URL

```
POST http://localhost:3000/categories
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Body

| Parâmetro | Tipo   | Descrição                           |
| :-------- | :----- | :---------------------------------- |
| name      | string | Nome da categoria. **Obrigatório**. |

#### Campos da resposta

| Campo | Tipo    | Descrição          |
| :---- | :------ | :----------------- |
| id    | inteiro | ID da categoria.   |
| name  | string  | Nome da categoria. |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 201    | Categoria criada com sucesso.               |
| 400    | Parâmetro ausente ou inválido.              |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request POST http://localhost:3000/categories \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTA2MTg1LCJleHAiOjE2NTE1MDk3ODV9.NrFKFOFHf6pFDlATuFdHpuSCXnd86Nk4H2fEP7DvuGA' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Educação"
}'
```

Resposta:

```json
{
  "id": 1,
  "name": "Educação"
}
```

---

### Buscar categorias

Busca todas as categorias.

O corpo da resposta contém um **array JSON** de objetos com informações das categorias.

#### URL

```
GET http://localhost:3000/categories
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

Nenhum.

#### Campos da resposta

| Campo | Tipo    | Descrição          |
| :---- | :------ | :----------------- |
| id    | inteiro | ID da categoria.   |
| name  | string  | Nome da categoria. |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Categorias retornadas com sucesso.          |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/categories \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTA2MTg1LCJleHAiOjE2NTE1MDk3ODV9.NrFKFOFHf6pFDlATuFdHpuSCXnd86Nk4H2fEP7DvuGA'
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Educação"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

---

### Criar postagem

Cria uma postagem.

O corpo da resposta contém um **objeto JSON** com informações da postagem criada.

#### URL

```
POST http://localhost:3000/post
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Body

| Parâmetro   | Tipo              | Descrição                                        |
| :---------- | :---------------- | :----------------------------------------------- |
| title       | string            | Título da postagem. **Obrigatório**.             |
| categoryIds | array de inteiros | IDs das categorias da postagem. **Obrigatório**. |
| content     | string            | Conteúdo da postagem. **Obrigatório**.           |

#### Campos da resposta

| Campo     | Tipo    | Descrição                                        |
| :-------- | :------ | :----------------------------------------------- |
| id        | inteiro | ID da postagem.                                  |
| title     | string  | Título da postagem.                              |
| content   | string  | Conteúdo da postagem.                            |
| published | string  | Data/hora UTC da publicação da postagem.         |
| updated   | string  | Data/hora UTC da última atualização da postagem. |
| userId    | inteiro | ID da pessoa usuária que criou a postagem.       |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 201    | Postagem criada com sucesso.                |
| 400    | Parâmetro ausente ou inválido.              |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request POST http://localhost:3000/post \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTA2MTg1LCJleHAiOjE2NTE1MDk3ODV9.NrFKFOFHf6pFDlATuFdHpuSCXnd86Nk4H2fEP7DvuGA' \
--header 'Content-Type: application/json' \
--data '{
  "title": "A Educação no Brasil",
  "categoryIds": [1],
  "content": "Como podemos melhorar a educação no Brasil?"
}'
```

Resposta:

```json
{
  "id": 1,
  "title": "A Educação no Brasil",
  "content": "Como podemos melhorar a educação no Brasil?",
  "published": "2022-05-02T15:59:43.183Z",
  "updated": "2022-05-02T15:59:43.183Z",
  "userId": 1
}
```

---

### Buscar postagens

Busca todas as postagens.

O corpo da resposta contém um **array JSON** de objetos com informações das postagens.

#### URL

```
GET http://localhost:3000/post
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

Nenhum.

#### Campos da resposta

| Campo            | Tipo             | Descrição                                                  |
| :--------------- | :--------------- | :--------------------------------------------------------- |
| id               | inteiro          | ID da postagem.                                            |
| title            | string           | Título da postagem.                                        |
| content          | string           | Conteúdo da postagem.                                      |
| published        | string           | Data/hora UTC da publicação da postagem.                   |
| updated          | string           | Data/hora UTC da última atualização da postagem.           |
| userId           | inteiro          | ID da pessoa usuária que criou a postagem.                 |
| user             | objeto           | Contém informações da pessoa usuária que criou a postagem. |
| user.id          | inteiro          | ID da pessoa usuária.                                      |
| user.displayName | string           | Nome de exibição da pessoa usuária.                        |
| user.email       | string           | Email da pessoa usuária.                                   |
| user.image       | string           | URL da imagem da pessoa usuária.                           |
| categories       | array de objetos | Contém informações das categorias da postagem.             |
| categories.id    | inteiro          | ID da categoria.                                           |
| categories.name  | string           | Nome da categoria.                                         |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Postagem retornada com sucesso.             |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/post \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTA2MTg1LCJleHAiOjE2NTE1MDk3ODV9.NrFKFOFHf6pFDlATuFdHpuSCXnd86Nk4H2fEP7DvuGA'
```

Resposta:

```json
[
  {
    "id": 1,
    "title": "A Educação no Brasil",
    "content": "Como podemos melhorar a educação no Brasil?",
    "published": "2022-05-02T15:59:43.000Z",
    "updated": "2022-05-02T15:59:43.000Z",
    "userId": 1,
    "user": {
      "id": 1,
      "displayName": "user name",
      "email": "user@email.com",
      "image": ""
    },
    "categories": [
      {
        "id": 1,
        "name": "Educação"
      }
    ]
  }
]
```

---

### Buscar postagem

Busca uma postagem especificada pelo seu ID.

O corpo da resposta contém um **objeto JSON** com informações da postagem.

#### URL

```
GET http://localhost:3000/post/{id}
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Path

| Campo | Tipo    | Descrição                     |
| :---- | :------ | :---------------------------- |
| id    | inteiro | ID da postagem a ser buscada. |

#### Campos da resposta

| Campo            | Tipo             | Descrição                                                  |
| :--------------- | :--------------- | :--------------------------------------------------------- |
| id               | inteiro          | ID da postagem.                                            |
| title            | string           | Título da postagem.                                        |
| content          | string           | Conteúdo da postagem.                                      |
| published        | string           | Data/hora UTC da publicação da postagem.                   |
| updated          | string           | Data/hora UTC da última atualização da postagem.           |
| userId           | inteiro          | ID da pessoa usuária que criou a postagem.                 |
| user             | objeto           | Contém informações da pessoa usuária que criou a postagem. |
| user.id          | inteiro          | ID da pessoa usuária.                                      |
| user.displayName | string           | Nome de exibição da pessoa usuária.                        |
| user.email       | string           | Email da pessoa usuária.                                   |
| user.image       | string           | URL da imagem da pessoa usuária.                           |
| categories       | array de objetos | Contém informações das categorias da postagem.             |
| categories.id    | inteiro          | ID da categoria.                                           |
| categories.name  | string           | Nome da categoria.                                         |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Postagem retornada com sucesso.             |
| 401    | Token de autenticação inválido ou expirado. |
| 404    | Postagem não existe.                        |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/post/1 \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTA2MTg1LCJleHAiOjE2NTE1MDk3ODV9.NrFKFOFHf6pFDlATuFdHpuSCXnd86Nk4H2fEP7DvuGA'
```

Resposta:

```json
{
  "id": 1,
  "title": "A Educação no Brasil",
  "content": "Como podemos melhorar a educação no Brasil?",
  "published": "2022-05-02T15:59:43.000Z",
  "updated": "2022-05-02T15:59:43.000Z",
  "userId": 1,
  "user": {
    "id": 1,
    "displayName": "user name",
    "email": "user@email.com",
    "image": ""
  },
  "categories": [
    {
      "id": 1,
      "name": "Educação"
    }
  ]
}
```

---

### Buscar postagens por termo

Busca postagens que contenham um termo em seu título ou conteúdo.

O corpo da resposta contém um **array JSON** de objetos com informações das postagens encontradas.

#### URL

```
GET http://localhost:3000/post/search
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Path

| Campo | Tipo   | Descrição                          |
| :---- | :----- | :--------------------------------- |
| q     | string | Termo a ser buscado nas postagens. |

#### Campos da resposta

| Campo            | Tipo             | Descrição                                                  |
| :--------------- | :--------------- | :--------------------------------------------------------- |
| id               | inteiro          | ID da postagem.                                            |
| title            | string           | Título da postagem.                                        |
| content          | string           | Conteúdo da postagem.                                      |
| published        | string           | Data/hora UTC da publicação da postagem.                   |
| updated          | string           | Data/hora UTC da última atualização da postagem.           |
| userId           | inteiro          | ID da pessoa usuária que criou a postagem.                 |
| user             | objeto           | Contém informações da pessoa usuária que criou a postagem. |
| user.id          | inteiro          | ID da pessoa usuária.                                      |
| user.displayName | string           | Nome de exibição da pessoa usuária.                        |
| user.email       | string           | Email da pessoa usuária.                                   |
| user.image       | string           | URL da imagem da pessoa usuária.                           |
| categories       | array de objetos | Contém informações das categorias da postagem.             |
| categories.id    | inteiro          | ID da categoria.                                           |
| categories.name  | string           | Nome da categoria.                                         |

#### Códigos de status da resposta

| Código | Descrição                                   |
| :----- | :------------------------------------------ |
| 200    | Postagens retornadas com sucesso.           |
| 401    | Token de autenticação inválido ou expirado. |

#### Exemplo

Requisição:

```sh
curl --request GET http://localhost:3000/post/search \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTEwMTYzLCJleHAiOjE2NTE1MTM3NjN9.po1SIKx2i2A4hke43Ij5EQcWTwmptU6qPs9p-cWjxHs' \
--get --data 'q=melhorar'
```

Resposta:

```json
[
  {
    "id": 1,
    "title": "A Educação no Brasil",
    "content": "Como podemos melhorar a educação no Brasil?",
    "published": "2022-05-02T15:59:43.000Z",
    "updated": "2022-05-02T15:59:43.000Z",
    "userId": 1,
    "user": {
      "id": 1,
      "displayName": "user name",
      "email": "user@email.com",
      "image": ""
    },
    "categories": [
      {
        "id": 1,
        "name": "Educação"
      }
    ]
  }
]
```

---

### Atualizar postagem

Atualiza uma postagem especificada pelo seu ID.

O corpo da resposta contém um **objeto JSON** com informações da postagem atualizada.

#### URL

```
PUT http://localhost:3000/post/{id}
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Path

| Campo | Tipo    | Descrição                        |
| :---- | :------ | :------------------------------- |
| id    | inteiro | ID da postagem a ser atualizada. |

##### Body

| Campo   | Tipo   | Descrição                              |
| :------ | :----- | :------------------------------------- |
| title   | string | Título da postagem. **Obrigatório**.   |
| content | string | Conteúdo da postagem. **Obrigatório**. |

#### Campos da resposta

| Campo           | Tipo             | Descrição                                      |
| :-------------- | :--------------- | :--------------------------------------------- |
| title           | string           | Título da postagem.                            |
| content         | string           | Conteúdo da postagem.                          |
| userId          | inteiro          | ID da pessoa usuária que criou a postagem.     |
| categories      | array de objetos | Contém informações das categorias da postagem. |
| categories.id   | inteiro          | ID da categoria.                               |
| categories.name | string           | Nome da categoria.                             |

#### Códigos de status da resposta

| Código | Descrição                                                             |
| :----- | :-------------------------------------------------------------------- |
| 200    | Postagem atualizada com sucesso.                                      |
| 400    | Parâmetro ausente ou inválido.                                        |
| 401    | Token de autenticação inválido ou expirado ou usuário não autorizado. |
| 404    | Postagem não existe.                                                  |

#### Exemplo

Requisição:

```sh
curl --request PUT http://localhost:3000/post/1 \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTE0MTQ2LCJleHAiOjE2NTE1MTc3NDZ9.1xnFzLfCwtl9bhnHyouQQqHp0mWFoPQTrtarGcrT63o' \
--header 'Content-Type: application/json' \
--data '{
  "title": "A Educação no Mundo",
  "content": "Como podemos melhorar a educação no Mundo?"
}'
```

Resposta:

```json
{
  "title": "A Educação no Mundo",
  "content": "Como podemos melhorar a educação no Mundo?",
  "userId": 1,
  "categories": [
    {
      "id": 1,
      "name": "Educação"
    }
  ]
}
```

---

### Excluir postagem

Exclui uma postagem especificada pelo seu ID.

A resposta não possui conteúdo em seu corpo.

#### URL

```
DELETE http://localhost:3000/post/{id}
```

#### Autorização

Requer o token de autenticação no campo de autorização `Authorization` do header.

#### Parâmetros

##### Path

| Campo | Tipo    | Descrição                      |
| :---- | :------ | :----------------------------- |
| id    | inteiro | ID da postagem a ser excluída. |

#### Campos da resposta

Nenhum.

#### Códigos de status da resposta

| Código | Descrição                                                             |
| :----- | :-------------------------------------------------------------------- |
| 204    | Postagem excluída com sucesso.                                        |
| 401    | Token de autenticação inválido ou expirado ou usuário não autorizado. |
| 404    | Postagem não existe.                                                  |

#### Exemplo

Requisição:

```sh
curl --head --request DELETE http://localhost:3000/post/1 \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWF0IjoxNjUxNTE0MTQ2LCJleHAiOjE2NTE1MTc3NDZ9.1xnFzLfCwtl9bhnHyouQQqHp0mWFoPQTrtarGcrT63o'
```

Resposta:

```sh
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Mon, 02 May 2022 18:12:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

---
