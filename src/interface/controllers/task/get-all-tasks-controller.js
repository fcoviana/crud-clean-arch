const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class GetAllTasksController {
  constructor(getAllTasksUseCase) {
    this.getAllTasksUseCase = getAllTasksUseCase;
  }

  async handle() {
    try {
      const taskList = await this.getAllTasksUseCase.handle();

      return HttpResponse.ok(taskList);
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
