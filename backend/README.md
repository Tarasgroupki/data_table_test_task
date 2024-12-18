## Test app


First of all, make sure that you have been already installed 
[Docker](https://docs.docker.com/engine/install/ubuntu/)
&
[Docker compose](https://docs.docker.com/compose/install/)

In case of troubles: we are using 

`Docker version 24.0.2, build cb74dfc`

`Docker Compose version v2.18.1`


## Description

We are using [Express.js](https://github.com/nestjs/nest) as a framework.

use next commands to create local `environment` and `configuration` files.

```bash
$ cp .env.example .env
```
Make a copy of the `.env` example file and fill required param values.


```bash
$ cp Dockerfile.example Dockerfile
```
Make a copy of the `Dockerfile.example` file.

```bash
$ cp docker-compose.example.yml docker-compose.yml
```
Make a copy of the `docker-compose.example.yml` file. Use existing configuration or change it based on your preferences.


## To start project WITH DOCKER !!

```bash
$ docker compose build #(for first time start)

# and then

$ docker compose up
```
or
```bash
$ docker compose up -d # with daemon
```

# To start project WITHOUT DOCKER

`Node 18.17.1 or higher`

make sure that you have launched local Redis & Postgres end wrote properly credentials into your .env file

OR

you can upload [Docker solution for starting PG & Redis](https://github.com/expirient/Compose-postgres-redis.git)

Setup credentials and run it 

for start server in development mode use 

```bash
$ npm run start:dev
```

## Useful commands: 

to see all local containers:
`docker ps -a`

to get inside a container
`docker exec -it [container name] bash`

## Running the app without docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

