# API

## Como executar ambiente de Desenvolvimento

Seguem abaixo algumas alternativas de instalação para um ambiente funcional de desenvolvimento. Sugerimos fortemente que o método recomendado seja aplicado, pois proporcionará um isolamento maior em relação ao sistema operacional, trazendo também melhor portabilidade e gestão de dependências.

## Método Recomendado: Ambiente em Containers, com Docker

### Requisitos Mínimos de Instalação

O principal requisito a ser instalado é [Docker](docker.com) para execução de [Linux Containers](https://www.redhat.com/en/topics/containers)

Instale, preferencialmente o [Docker Desktop](https://www.docker.com/products/docker-desktop/) em sua estação de trabalho. Há opções para LINUX, WINDOWS e Mac (Apple e Intel Chips). Caso deseje, pode-se instalar o [Docker Engine](https://docs.docker.com/engine/install/), que traz uma abordagem para servidores. 

Os requisitos mínimos para um bom funcionamento seguem a documentação da Docker:

* Windows: https://docs.docker.com/desktop/install/windows-install/#system-requirements
* Linux: https://docs.docker.com/desktop/install/linux-install/#system-requirements
* Mac: https://docs.docker.com/desktop/install/mac-install/#system-requirements

Este projeto foi homologado com Docker Desktop versão 4.13.X.

Adicionalmente, instale [GIT](https://git-scm.com/downloads)

### Requisitos Mínimos de Integração

A aplicação faz persistência dos arquivos PDFs (históricos e produções científicas) através de um serviço de armazenamento de objetos chamado Simple Storage Service (S3). Faz-se necessário que o serviço tenha compatibilidade com [Amazon S3 REST API](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html)

Utilize S3 compatíveis, na Cloud, como por exemplo:

* Amazon S3: https://aws.amazon.com/pt/s3/
* Digital Ocean Spaces: https://www.digitalocean.com/products/spaces
* Google Cloud Storage: https://cloud.google.com/storage?hl=pt-br

Para soluções *on-premise*, pode-se instalar soluções como:

- MinIO: https://min.io/
- CEPH: https://ceph.io/

### Baixando o projeto

Com o GIT, clone o projeto

```
# git clone https://github.com/mate85-equipe03/backend.git
```

### Configurando a aplicação

Gere um arquivo `.env` com base no arquivo de exemplo: 

```
$ cp .env.example .env
```

Parametrize a aplicação, de acordo com as variáveis de ambientes disponíveis:

* variáveis de banco de dados: nome do banco, usuario, porta, senha;
* portas de aplicações: porta da API e do Adminer
* configurações para conexão com um serviço de "S3 Bucket", para armazenamento dos arquivos
* Configurações para conexão com um serviço de envio de email, via SMTP.

### Gerenciando ambiente

Com todos os requisitos satisfeitos e variáveis de configuração do ambiente preenchidas, gerencie o ambiente com Docker Compose. Sugerimos a utilização da [V2 do Compose](https://docs.docker.com/compose/compose-v2/), já embutido nas novas instalações do Docker Desktop

Utilize o comando `docker compose ...` para gerir ambiente

```
# -----------------------------------------------
# Subindo pela primeira vez:
# -----------------------------------------------

# Buildar (se necessário) e subir todos services
$ docker compose up -d

# Rodar as migrations (configuração do banco de dados):

# Execute a criação do banco de dados
$ docker container exec -t backend-api-1 npx prisma migrate dev

# Execute o reset do banco e a população com o seed
$ docker container exec -t backend-api-1 npx prisma migrate reset

```

Os serviços devem estar disponíveis para acesso:

* API: http://localhost:<ePORT>
* Adminer: http://localhost:<ADMINER_PORT>
* Banco: http://localhost:<DATABASE_PORT>


Alguns comandos úteis:

```
# Verifique o status dos containers:
$ docker compose ps

# Verifique logs por serviços (ex: api):
$ docker compose logs -f api

# Restart um serviço (ex: api)
# docker compose restart api

# buildar imagem da api
$ docker compose build api # Ou
$ docker compose build --no-cache api

# help com mais opções
$ docker compose --help
```

## Método Alternativo: Local - Node.js

Faz-se necessário ter instalado [NodeJS](https://nodejs.org/en/), além de um banco de dados Postgres.

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

