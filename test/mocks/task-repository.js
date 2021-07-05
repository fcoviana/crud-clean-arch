module.exports = class TaskRepositorySpy {
  create = jest.fn();
  destroy = jest.fn();
  fetchAll = jest.fn();
  fetchOne = jest.fn();
  update = jest.fn();
}