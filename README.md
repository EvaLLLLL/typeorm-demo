## TypeORM demo

Steps to run this project:

1. create a psql docker container

```bash
docker run -v "$PWD/pot-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:14.3
```

2. create a database

```bash
CREATE DATABASE pot_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

3. install dependencies

```bash
yarn
```

4. start this project

```bash
yarn dev
```
