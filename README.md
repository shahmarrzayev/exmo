Exmo Project
===============

## Description

Back-end service for Exmo.

## Installation

```bash
$ npm install
```

## Running the app

In order to run the app locally, you will need a postgres instance running.
You can run one with Docker, using the following command:
```bash
docker run \
    --name postgres \
    -p 5432:5432  \
    -e POSTGRES_USER=doctoro \
    -e POSTGRES_PASSWORD=doctoro \
    -e POSTGRES_DB=doctoro \
    -d \
    postgres
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database migrations
To create a migration:
```bash
npm run typeorm migration:create -n ExampleMigrationName
```

To migrate:
```bash
npm run typeorm-migrate
```

## Stay in touch

- Author - [Rzayev Shahmar](https://www.linkedin.com/in/şahmar-rzayev/)

## License

Nest is [MIT licensed](LICENSE).
