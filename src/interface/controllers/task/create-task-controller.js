const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class CreateTaskController {
  constructor(createTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  async handle(httpRequest) {
    try {
      const data = httpRequest.body;
      const taskCreated = await this.createTaskUseCase.handle({
        title: data.title,
        description: data.description
      });

      return HttpResponse.created({ ...taskCreated });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
