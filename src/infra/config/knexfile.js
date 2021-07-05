require('./bootstrap');
const path = require('path');
const { DB_CLIENT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../orm/knex/db.sqlite')
    },
    migrations: {
      directory: '../orm/knex/migrations'
    },
    useNullAsDefault: true,
  },

  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8',
      port: DB_PORT,
    },
    migrations: {
      directory: '../orm/knex/migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  }
};
