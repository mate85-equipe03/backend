# API


## Como rodar ambiente de Desenvolvimento

Necessário apenas possuir [Docker](https://www.docker.com/) instalado.

Gere um arquivo `.env` com base no exemplo:

```
$ cp .env.example .env
```

Popule o arquivo com as credenciais de banco de dados desejado e uma porta para subir a API

Utilize `docker compose` para gerir ambiente

```
# Buildar (se necessário) e subir os services
$ docker compose up -d

# buildar imagem da api
$ docker compose build api

# help com mais opções
$ docker compose --help
```

Exemplos acima com Docker Compose v2. Pode-se usar a v1, se desejar.

Consulte [Docs](https://docs.docker.com/compose/) do Docker Compose para mais opções.


