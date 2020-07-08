<!--[meta]
section: api
subSection: database-adapters
title: Prisma adapter
[meta]-->

# Prisma database adapter

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@keystonejs/adapter-prisma)

> The Keystone Prisma adapter is not currently production-ready. It depends on the [`prisma-migrate`](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) system which is currently flagged as `EXPERIMENTAL`. Once `prisma-migrate` is out of experimental mode we will release a production-ready version of `@keystonejs/adapter-prisma`.

The [Prisma](https://www.prisma.io/) adapter allows you to connect to a

> This adapter currently only supports `PostgreSQL`. Future releases will enable support for all database backends which are supported by Prisma.

## Usage

```javascript
const { PrismaAdapter } = require('@keystonejs/adapter-prisma');

const keystone = new Keystone({
  adapter: new PrismaAdapter({ url: 'postgres://...' }),
});
```

## Config

### `url`

_**Default:**_ `DATABASE_URL`

The connection string for your database, in the form `postgres://<user>:<password>@<host>:<port>/<dbname>`.

### `getPrismaPath`

_**Default:**_ `({ prismaSchema }) => '.prisma'`

A function which returns a directory name for storing the generated Prisma schema and client.

### `getDbSchemaName`

_**Default:**_ `({ prismaSchema }) => 'public'`

A function which returns a database schema name to use for storage of all Keystone tables in your database.

> If you include a `?schema=...` argument in your `DATABASE_URL` or `url` you should set this value to `() => null`.

### `dropDatabase`

_**Default:**_ `false`

FIXME: Allow the adapter to drop the entire database and recreate the tables / foreign keys based on the list schema in your application. This option is ignored in production, i.e. when the environment variable NODE_ENV === 'production'.

### `enableLogging`

_**Default:**_ `false`

Enables logging of queries in the Prisma client.

## Debugging

To log all Knex queries, run the server with the environment variable `DEBUG=knex:query`.

## Setup

Before running Keystone with the Prisma adapter you will need to have a PostgreSQL database to connect to..

If you already have a database then you can use its connection

```shell allowCopy=false showLanguage=false
createdb -U postgres keystone
psql keystone -U postgres -c "CREATE USER keystone5 PASSWORD 'k3yst0n3'"
psql keystone -U postgres -c "GRANT ALL ON DATABASE keystone TO keystone5;"
```

If using the above, you will want to set a connection string of: `postgres://keystone5:k3yst0n3@localhost:5432/keystone`
