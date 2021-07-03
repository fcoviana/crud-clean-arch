const { GetByIdTaskUseCase, KnexTaskRepository, GetByIdTaskController } = require('./import');

module.exports = class GetByIdTaskRouterComposer {
  static compose() {
    const getByIdTaskUseCase = new GetByIdTaskUseCase({ 
      taskRepository: new KnexTaskRepository()
    });

    return new GetByIdTaskController(getByIdTaskUseCase);
  }
};
