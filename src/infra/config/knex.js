require('./bootstrap');

const { CONECTION } = process.env;
const knexConfig = require('./knexfile.js');
const knex = require('knex')(knexConfig[CONECTION]);

module.exports = knex;
