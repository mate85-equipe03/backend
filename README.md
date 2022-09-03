# API


## Como rodar ambiente de Desenvolvimento

Necessário apenas possuir [Docker](https://www.docker.com/) instalado.

Gere um arquivo `.env` com base no exemplo:

```
$ cp .env.example .env
```

Popule o arquivo escolhendo o banco desejado (postgres|mysql), credenciais, além de portas para expor os serviços para o host.

Utilize `docker compose` para gerir ambiente

```
# Buildar (se necessário) e subir os todos services
$ docker compose up -d

# buildar imagem da api
$ docker compose build api

# help com mais opções
$ docker compose --help
```

Exemplos acima com Docker Compose v2. Pode-se usar a v1, se desejar.

Consulte [Docs](https://docs.docker.com/compose/) do Docker Compose para mais opções.


