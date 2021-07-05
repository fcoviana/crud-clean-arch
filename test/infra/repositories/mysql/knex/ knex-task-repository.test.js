const KnexTaskRepository = require('../../../../../src/infra/repositories/mysql/knex/knex-task-repository');
const { NotFoundError } = require('../../../../../src/shared/utils/errors');
const Task = require('../../../../../src/domain/entities/task');

const makeEntityData = () => ({
  id: 'any-id',
  title: 'any-title',
  description: 'any-description'
})

const makeUpTable = async (conn) => {
  return conn.schema.createTable('tasks', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.date('createdAt').notNullable().defaultTo();
    table.date('updatedAt').notNullable().defaultTo();
    table.date('deletedAt').nullable();
  });
}

const makeDownTable = (conn) => conn.schema.dropTable('tasks');

const makeSut = () => {
  const entityData = makeEntityData();

  const sut = new KnexTaskRepository(Task, 'tasks');

  return {
    sut,
    entityData,
  }
}

describe("repository: KnexTaskRepository", () => {

  beforeEach(async () => {
    const { sut } = makeSut();
    await makeUpTable(sut.conn);
  });

  afterEach(async () => {
    const { sut } = makeSut();
    await makeDownTable(sut.conn);
  });

  test("Should return entity created", async () => {
    const { sut, entityData } = makeSut();

    const entityCreated = await sut.create(entityData);

    expect(entityData).toEqual({
      id: entityCreated.id,
      description: entityCreated.description,
      title: entityCreated.title
    });
  });

  test("Should call create", async () => {
    const { sut, entityData } = makeSut();
    jest.spyOn(sut, sut.create.name);

    await sut.create(entityData);

    expect(sut.create).toHaveBeenCalled();
    expect(sut.create).toHaveBeenCalledTimes(1);
    expect(sut.create).toHaveBeenCalledWith(entityData);
  });

  test("Should call create without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.create()).rejects.toThrow();
    await expect(sut.create()).rejects.toThrow(TypeError);
    await expect(sut.create()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a repository without a context and create", async () => {
    const sut = new KnexTaskRepository();

    await expect(sut.create()).rejects.toThrow();
    await expect(sut.create()).rejects.toThrow(TypeError);
    await expect(sut.create()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should return NotFoundError fetchOne", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, sut.fetchOne.name);

    const id = { id: 'any-id' };
    await expect(sut.fetchOne(id)).rejects.toThrow();
    await expect(sut.fetchOne(id)).rejects.toThrow(NotFoundError);
    await expect(sut.fetchOne(id)).rejects.toThrow("Task not found!");
  });

  test("Should call fetchOne without parameter", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, sut.fetchOne.name);

    await expect(sut.fetchOne()).rejects.toThrow();
    await expect(sut.fetchOne()).rejects.toThrow(TypeError);
    await expect(sut.fetchOne()).rejects.toThrow("The operator \"undefined\" is not permitted");
  });

  test("Should return entity in fetchOne", async () => {
    const { sut, entityData } = makeSut();

    await sut.create(entityData);
    const entity = await sut.fetchOne({ id: entityData.id });

    expect(entityData).toEqual({
      id: entity.id,
      description: entity.description,
      title: entity.title
    });
  });

  test("Should call fetchOne", async () => {
    const { sut, entityData } = makeSut();
    jest.spyOn(sut, sut.fetchOne.name);

    const id = { id: entityData.id };
    await sut.create(entityData);
    await sut.fetchOne(id);

    expect(sut.fetchOne).toHaveBeenCalled();
    expect(sut.fetchOne).toHaveBeenCalledTimes(1);
    expect(sut.fetchOne).toHaveBeenCalledWith(id);
  });

  test("Should instantiate a repository without a context and fetchOne", async () => {
    const sut = new KnexTaskRepository();

    await expect(sut.fetchOne()).rejects.toThrow();
    await expect(sut.fetchOne()).rejects.toThrow(TypeError);
    await expect(sut.fetchOne()).rejects.toThrow("The operator \"undefined\" is not permitted");
  });

  test("Should return entities in fetchAll", async () => {
    const { sut, entityData } = makeSut();

    await sut.create(entityData);
    await sut.create({ ...entityData, id: 'id-2' });
    const entities = await sut.fetchAll();

    expect.arrayContaining(entities);
    expect(entities.length).toBe(2);
  });

  test("Should return entities is empty in fetchAll", async () => {
    const { sut } = makeSut();
    const entities = await sut.fetchAll();

    expect.arrayContaining(entities);
    expect(entities.length).toBe(0);
  });

  test("Should call fetchAll", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, sut.fetchAll.name);

    await sut.fetchAll();

    expect(sut.fetchAll).toHaveBeenCalled();
    expect(sut.fetchAll).toHaveBeenCalledTimes(1);
    expect(sut.fetchAll).toHaveBeenCalledWith();
  });

  test("Should return entity in update", async () => {
    const { sut, entityData } = makeSut();

    await sut.create(entityData);
    Object.assign(entityData, { title: 'title-edit' });
    const entityUpdated = await sut.update(entityData);

    expect(entityData).toEqual({
      id: entityUpdated.id,
      description: entityUpdated.description,
      title: entityUpdated.title
    });
  });

  test("Should call update", async () => {
    const { sut, entityData } = makeSut();
    jest.spyOn(sut, sut.update.name);

    await sut.create(entityData);
    Object.assign(entityData, { title: 'title-edit' });
    await sut.update(entityData);

    expect(sut.update).toHaveBeenCalled();
    expect(sut.update).toHaveBeenCalledTimes(1);
    expect(sut.update).toHaveBeenCalledWith(entityData);
  });

  test("Should instantiate a repository without a context and update", async () => {
    const sut = new KnexTaskRepository();

    await expect(sut.update()).rejects.toThrow();
    await expect(sut.update()).rejects.toThrow(TypeError);
    await expect(sut.update()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should call update without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.update()).rejects.toThrow();
    await expect(sut.update()).rejects.toThrow(TypeError);
    await expect(sut.update()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should return entity in destroy", async () => {
    const { sut, entityData } = makeSut();

    await sut.create(entityData);
    const entityUpdated = await sut.destroy(entityData);

    expect(entityData.deletedAt).not.toBeNull();
    expect(entityData).toEqual({
      id: entityUpdated.id,
      description: entityUpdated.description,
      title: entityUpdated.title
    });
  });

  test("Should call destroy", async () => {
    const { sut, entityData } = makeSut();
    jest.spyOn(sut, sut.destroy.name);

    await sut.create(entityData);
    await sut.destroy(entityData);

    expect(sut.destroy).toHaveBeenCalled();
    expect(sut.destroy).toHaveBeenCalledTimes(1);
    expect(sut.destroy).toHaveBeenCalledWith(entityData);
  });

  test.skip("Should instantiate a repository without a context and destroy", async () => {
    const sut = new KnexTaskRepository();

    await expect(sut.destroy()).rejects.toThrow();
    await expect(sut.destroy()).rejects.toThrow(TypeError);
    await expect(sut.destroy()).rejects.toThrow("this.entity is not a constructo");
  });

  test.skip("Should call destroy without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.destroy()).rejects.toThrow();
    await expect(sut.destroy()).rejects.toThrow(Error);
    await expect(sut.destroy()).rejects.toThrow("Undefined binding(s) detected when compiling UPDATE. Undefined column(s): [id] query: update `entities` set `deletedAt` = ? where `id` = ?");
  });

  test("Should call delete", async () => {
    const { sut, entityData } = makeSut();
    jest.spyOn(sut, sut.delete.name);

    const id = { id: entityData.id };
    await sut.create(entityData);
    await sut.delete(id);

    expect(sut.delete).toHaveBeenCalled();
    expect(sut.delete).toHaveBeenCalledTimes(1);
    expect(sut.delete).toHaveBeenCalledWith(id);
  });

  test("Should instantiate a repository without a context and delete", async () => {
    const sut = new KnexTaskRepository();

    await expect(sut.delete()).rejects.toThrow();
    await expect(sut.delete()).rejects.toThrow(Error);
    await expect(sut.delete()).rejects.toThrow("Undefined binding(s) detected when compiling DEL. Undefined column(s): [id] query: delete from `tasks` where `id` = ?");
  });
  
  test("Should call delete without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.delete()).rejects.toThrow();
    await expect(sut.delete()).rejects.toThrow(Error);
    await expect(sut.delete()).rejects.toThrow("Undefined binding(s) detected when compiling DEL. Undefined column(s): [id] query: delete from `tasks` where `id` = ?");
  });
});
