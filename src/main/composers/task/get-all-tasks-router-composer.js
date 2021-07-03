const { GetAllTasksUseCase, KnexTaskRepository, GetAllTasksController } = require('./import');

module.exports = class GetAllTasksRouterComposer {
  static compose() {
    const getAllTasksUseCase = new GetAllTasksUseCase({ 
      taskRepository: new KnexTaskRepository()
    });

    return new GetAllTasksController(getAllTasksUseCase);
  }
};
