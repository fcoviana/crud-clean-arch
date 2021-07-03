const OutputBoundary = require('./output-boundary');

module.exports = class GetAllTasksUseCase {
  constructor({ taskRepository } = {}) {
    this.taskRepository = taskRepository;
  }

  async handle() {
    const taskList = await this.taskRepository.fetchAll();

    return taskList.map(task => new OutputBoundary(task))
  }
}
