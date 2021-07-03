module.exports = {
  CreateTaskUseCase: require('../../../app/use-case/task/create/create-task'),
  GetByIdTaskUseCase: require('../../../app/use-case/task/get-by-id/get-by-id-task'),
  GetAllTasksUseCase: require('../../../app/use-case/task/get-all/get-all-tasks'),
  UpdateTaskUseCase: require('../../../app/use-case/task/update/update-task'),
  DeleteTaskUseCase: require('../../../app/use-case/task/delete/delete-task'),
  KnexTaskRepository: require('../../../infra/repositories/mysql/knex/knex-task-repository'),
  CreateTaskController: require('../../../interface/controllers/task/create-task-controller'),
  GetByIdTaskController: require('../../../interface/controllers/task/get-by-id-task-controller'),
  GetAllTasksController: require('../../../interface/controllers/task/get-all-tasks-controller'),
  UpdateTaskController: require('../../../interface/controllers/task/update-task-controller'),
  DeleteTaskController: require('../../../interface/controllers/task/delete-task-controller'),
};