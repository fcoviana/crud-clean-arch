module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'task_pock',
    charset: 'utf8',
    port: '3306',
  },
  migrations: {
    directory: '../orm/knex/migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
};
