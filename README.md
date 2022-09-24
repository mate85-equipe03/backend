# API


## Como rodar ambiente de Desenvolvimento

Gere um arquivo `.env` com base no exemplo: 

```
$ cp .env.example .env

```
### Docker

Popule o arquivo escolhendo o banco desejado (postgres|mysql), credenciais, além de portas para expor os serviços para o host.

Utilize `docker compose` para gerir ambiente

```
# Buildar (se necessário) e subir os todos services
$ docker compose up -d

# Rodar as migrations

# Abra um processo shell no container em execução
$ docker container exec -it backend-api-1 sh

# Execute e saia
$ npx prisma migrate dev
$ exit

# buildar imagem da api
$ docker compose build api # Ou
$ docker compose build --no-cache api

# help com mais opções
$ docker compose --help
```

Exemplos acima com Docker Compose v2. Pode-se usar a v1, se desejar.

Consulte [Docs](https://docs.docker.com/compose/) do Docker Compose para mais opções.

### Local - Node.js


```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Migrations & Seeds

Como rodar uma migration:

npx prisma migrate dev


Pra facilitar, resete sempre o banco, utilizando o PRISMA


```
$ npx prisma migrate reset
```

Vai apagar o banco todo, rodar novamente as migrations e popular com o seed.


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


