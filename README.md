# SB Clean Blog Node

[![Build Status](https://travis-ci.org/StartBootstrap/sb-clean-blog-node.svg?branch=master)](https://travis-ci.org/StartBootstrap/sb-clean-blog-node)

## Links

[Click here for the frontend.](https://github.com/StartBootstrap/sb-clean-blog-angular)
Built with Angular

[Click here to view Angular code coverage](https://sb-clean-blog.startbootstrap.com/coverage/sb-clean-blog-angular/index.html)

[Click here to view Node code coverage](https://sb-clean-blog.startbootstrap.com/coverage/sb-clean-blog-node/index.html)


## Prerequisites

Before you begin, make sure your development environment inlcudes the following technologies:

### 1) Node.js

We recommend you use the latest LTS version of node, which is currently 12.x

To get node, go to [nodejs.org](http://nodejs.org)

To check your node version run the following in terminal:

```bash
node --version
```

### 2) Postgres

Our Chosen ORM in Node is TypeORM. [TypeORM suports most major databases](https://typeorm.io/#/connection-options)

We prefer the very popular and open source [postgres](https://www.postgresql.org).

If desiered it should be relatively trivial to switch databases.

_Note: db scripts at `scripts/db/` have not been tested with any other databases besides postgres_

To get postgres, go to [postgresql.org](https://www.postgresql.org/download) or install via [homebrew](https://brew.sh/)

_Note: If you install via homebrew, don't forget to run `brew services start postgresql`_

To check your postgres version run the following in terminal:

```bash
psql --version
```

To set up a new user in postgres type the following in terminal (It will prompt you for a password):

```bash
createuser newuser --pwprompt --createdb # newuser can be any username you choose
```

#### _NOTE: Remember the username password you use here. You will need to add it into `.env`_

Test that you can log in to postgres:

```bash
psql -U newuser template1
```

Common postgres commands can be found in: [NOTES/POSTGRES.md](NOTES/POSTGRES.md)

## Quick Start

### Download the repo

```bash
git clone git@github.com:startbootstrap/sb-clean-blog-node.git
cd sb-clean-blog-node
```

### 1) Set up `.env`

```bash
cp .env.sample .env
```

Open `.env` and change the values for:

```bash
DB_ROOT_USER_PASSWORD=CHANGE_ME__STRING # make up a password
TYPE_ORM_USERNAME=CHANGE_ME__STRING # postgres username
TYPE_ORM_PASSWORD=CHANGE_ME__STRING # postgres password
JWT_SECRET=CHANGE_ME__STRING # make up a random string
```

### 2) Install dependencies

```bash
npm install
```

### 3) Reset the database

This command:

- drops the current database
- recreates the databse
- runs all migrations
- creates the root user
- seeds the db with random posts

```bash
npm run db:reset # See the next command if you have issues with this command
```

#### If you receive an error `function uuid_generate_v4() does not exist` then run the command:

```bash
npm run db:uuid
```

This will add the extension `uuid-ossp` to the template1 databse.

You will then need to run `npm run db:reset` again

### 4) Start the server

```bash
npm start
```

You should be able to hit <http://localhost:8200/api/latest/health>

### 5) Run the front end (sb-clean-blog-angular)

Follow the README at [sb-clean-blog-angular](https://github.com/StartBootstrap/sb-clean-blog-angular)

## Tests

Unit Tests are named `*.test.ts` and are located in the same directory as the file they are testing.

### Unit Tests

```bash
npm run test

# To keep the test runner going as you devleop tests use:
npm run test:watch
```

To run a specific test, you can do:

```bash
npm run test:one -- -t=[string]
```

#### View Coverage

```bash
npm run serve:coverage
```

## Migrations

```bash
# typeOrm cli help
npm run cli -- -h

# Create a migration
npm run db:migration:generate -- -n my-migration

# Run migrations 
npm run db:migration:run
```

## Docker

SB Clean Blog Node comes with a Dockerfile and build scripts.

You can get Docker [here](https://www.docker.com/get-started)

```bash
# Be sure to build the app first
npm run build

# Then build the docker image
npm run docker:build

# Then run the image
npm run docker:run
```

If you intend to use this in production, you will need to modify the run script:
`scripts/docker/docker-run.ts` to change the .env variables to point to your production postgres instance.

You will also need to develop a way to initialize and run migrations on the production database.
One option is to set you local .env to temporarily point to your production database and run the commands locally.

## Style

### Lint Code

```bash
npm run lint
```

### Fix all fixable lint errors

```bash
npm run lint:fix
```

### Check if any tslint rules conflick with prettier

```bash
npm run lint:check
```

## Debug 

### To run in debug mode

```bash
npm run debug
```

### To debug tsonfig

```bash
node_modules/.bin/tsc --showConfig -p ./src/tsconfig.app.json
node_modules/.bin/tsc --showConfig -p ./src/tsconfig.spec.json
```
