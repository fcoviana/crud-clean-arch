const BaseRepository = require('../../../../domain/repositories/base-repository');
const { NotFoundError } = require('../../../../shared/utils/errors');
const knex = require('../../../config/knex');

module.exports = class KnexBaseRepository extends BaseRepository {
  constructor(entity, table) {
    super();
    this.queryBuilder = knex;
    this.entity = entity;
    this.table = table;
  }

  async create(data) {
    const entity = new this.entity(data);
    await this.queryBuilder(this.table).insert(entity);

    return entity;
  }

  async fetchOne(where) {
    const [record] = await this.queryBuilder(this.table).where(where);
    if (!record) throw new NotFoundError(`${this.entity.name} not found!`);
    const entity = new this.entity(record);

    return entity;
  }

  async fetchAll() {
    const records = await this.queryBuilder(this.table).where({ deletedAt: null });
    const entities = records.map((record) => new this.entity(record));

    return entities;
  }

  async update(data) {
    const entity = new this.entity(data);
    await this.queryBuilder(this.table).where({ id: entity.id }).update(data);

    return entity;
  }

  async destroy(data) {
    return await this.update({ ...data, deletedAt: new Date() });
  }

  async delete(id) {
    await this.queryBuilder(this.table).where({ id }).del();
  }
};
