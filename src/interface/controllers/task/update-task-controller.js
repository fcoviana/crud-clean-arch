const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class UpdateTaskController {
  constructor(updateTaskUseCase) {
    this.updateTaskUseCase = updateTaskUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const taskUpdated = await this.updateTaskUseCase.handle({
        id: data.id,
        title: data.title,
        description: data.description
      });

      return HttpResponse.ok({ ...taskUpdated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
