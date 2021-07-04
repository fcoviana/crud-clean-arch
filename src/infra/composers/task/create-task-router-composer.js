const { CreateTaskUseCase, KnexTaskRepository, CreateTaskController } = require('./import');

module.exports = class CreateTaskRouterComposer {
  static compose() {
    const createTaskUseCase = new CreateTaskUseCase({
      taskRepository: new KnexTaskRepository()
    });

    return new CreateTaskController(createTaskUseCase);
  }
};
