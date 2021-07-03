const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class CreateTaskUseCase {
  constructor({ taskRepository } = {}) {
    this.taskRepository = taskRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const taskCreated = await this.taskRepository.create(inputBoundary);

    return new OutputBoundary(taskCreated);
  }
}
