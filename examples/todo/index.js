const { Keystone } = require('@keystonejs/keystone');
const { PrismaAdapter } = require('@keystonejs/adapter-prisma');
const { Text } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const keystone = new Keystone({
  adapter: new PrismaAdapter({
    getDbSchemaName: () => 'test_schema',
    // url: 'postgres://keystone5:k3yst0n3@localhost:5432/keystone',
  }),
  cookieSecret: 'shutup',
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
    other: { type: Text },
    more: { type: Text },
    aha: { type: Text },
    asdfasd: { type: Text },
    ertq: { type: Text },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ name: 'Keystone To-Do List', enableDefaultRoute: true }),
  ],
};
