exports.up = (knex) =>
  knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.date('createdAt').notNullable().defaultTo();
    table.date('updatedAt').notNullable().defaultTo();
    table.date('deletedAt').nullable();
  });

exports.down = (knex) => knex.schema.dropTable('tasks');
