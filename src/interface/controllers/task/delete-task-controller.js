const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class DeleteTaskController {
  constructor(deleteTaskUseCase) {
    this.deleteTaskUseCase = deleteTaskUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const taskDeleted = await this.deleteTaskUseCase.handle({
        id: data.id,
        title: data.title,
        description: data.description
      });

      return HttpResponse.ok({ ...taskDeleted });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
