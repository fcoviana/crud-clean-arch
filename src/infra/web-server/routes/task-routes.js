const {
  CreateTaskRouterComposer,
  GetByIdTaskRouterComposer,
  GetAllTasksRouterComposer,
  UpdateTaskRouterComposer,
  DeleteTaskRouterComposer
} = require("../../composers/task");
const { adapt } = require("../../adapters/express-router-adapter");

const prefix = '/tasks';

module.exports = (router) => {
  router.post(
    prefix,
    adapt(CreateTaskRouterComposer.compose())
  );

  router.get(
    `${prefix}/:id`,
    adapt(GetByIdTaskRouterComposer.compose())
  );

  router.get(
    prefix,
    adapt(GetAllTasksRouterComposer.compose())
  );

  router.put(
    `${prefix}/:id`,
    adapt(UpdateTaskRouterComposer.compose())
  );

  router.delete(
    `${prefix}/:id`,
    adapt(DeleteTaskRouterComposer.compose())
  );
};
