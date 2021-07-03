const KnexBaseRepository = require('./knex-base-repository');
const Task = require('../../../../domain/entities/task');

module.exports = class KnexTaskRepository extends KnexBaseRepository {
  constructor() {
    super(Task, 'tasks');
  }
}
