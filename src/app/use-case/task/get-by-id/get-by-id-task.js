const InputBoundary = require('./input-boundary');
const OutputBoundary = require('./output-boundary');

module.exports = class GetByIdTaskUseCase {
  constructor({ taskRepository } = {}) {
    this.taskRepository = taskRepository;
  }

  async handle(input) {
    const inputBoundary = new InputBoundary(input);
    const taskRecovered = await this.taskRepository.fetchOne(inputBoundary);

    return new OutputBoundary(taskRecovered);
  }
}
