const { DeleteTaskUseCase, KnexTaskRepository, DeleteTaskController } = require('./import');

module.exports = class DeleteTaskRouterComposer {
  static compose() {
    const deleteTaskUseCase = new DeleteTaskUseCase({
      taskRepository: new KnexTaskRepository()
    });

    return new DeleteTaskController(deleteTaskUseCase);
  }
};
