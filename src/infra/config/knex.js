const knexConfig = require('./knexfile.js');
const knex = require('knex')(knexConfig);

module.exports = knex;
