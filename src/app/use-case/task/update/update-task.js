const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class UpdateTaskUseCase {
  constructor({ taskRepository } = {}) {
    this.taskRepository = taskRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const taskUpdated = await this.taskRepository.update(inputBoundary);

    return new OutputBoundary(taskUpdated);
  }
}
