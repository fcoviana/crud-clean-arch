const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class DeleteTaskUseCase {
  constructor({ taskRepository } = {}) {
    this.taskRepository = taskRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const taskDeleted = await this.taskRepository.destroy(inputBoundary);

    return new OutputBoundary(taskDeleted);
  }
}
