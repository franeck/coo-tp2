# TP 2 - Principes POO & Design Patterns

> Franciszek Dobrowolski - AP5 2019-2020 

## Navigation

Ce repository constitue le rendu pour le TP2. Afin de naviguer dans les réponses choisissez le commit correspondant:

- [Question 1](https://github.com/franeck/tp2-ap5/tree/dec26eea86db702beab333b70cb0d241728fa89c)

- [Question 2](https://github.com/franeck/tp2-ap5/tree/2e2887bc52c4c03b439be966333402c5812fc263)

- [Question 3](https://github.com/franeck/tp2-ap5/tree/40030627750bebf0c93a5431dcf7d95d66066b68)

- [Question 4](https://github.com/franeck/tp2-ap5/tree/c7612eba4f1b14d159360c1b2d42e5a24bb853ad)

- [Question 5](https://github.com/franeck/tp2-ap5/tree/b01e1a9b22c28de81f4914fde8ed74bdbb5f4acb)

- [Question 6](https://github.com/franeck/tp2-ap5/tree/01e4fe408148befe61c283b6edc4e0dcc74b6a76)

Les réponses se trouvent dans le README du chaque commit.

## Get started

Ensure you have `make` installed on your system.

After cloning te repository run:

```bash
make init
```

Now you can start|stop|restart your server by running:

```bash
make start|stop|restart
```

Your server will listen by default on port `3000` of your `$DOCKER_HOST`

You can access the server logs by running:

```bash
make log
```

If you want to stop and destroy your docker containers:

```bash
make down
```

Launch dependencies install with:

```bash
make install
```

## Running a command in a running container

To run a command in your container, run the following:

```bash
docker exec <container_name> <command>
```

eg:

```bash
docker exec starter-back_server sudo rm -rf /
```

## Running a command in a stopped/failed container

You will have to run a command through `docker-compose`:

```bash
docker-compose run --rm <service_name> <command>
```

eg:

```bash
docker-compose run --rm node npm install --save-dev typescript
```

## Access your container

To connect to a container, run:

```bash
docker exec -ti <container_name> sh
```
