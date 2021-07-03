const { UpdateTaskUseCase, KnexTaskRepository, UpdateTaskController } = require('./import');

module.exports = class UpdateTaskRouterComposer {
  static compose() {
    const updateTaskUseCase = new UpdateTaskUseCase({
      taskRepository: new KnexTaskRepository()
    });

    return new UpdateTaskController(updateTaskUseCase);
  }
};
