const ControllerErros = require('../controller-erros');
const HttpResponse = require('../../helppers/http-response');

module.exports = class GetByIdTaskController {
  constructor(getByIdTaskUseCase) {
    this.getByIdTaskUseCase = getByIdTaskUseCase;
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const taskRecovered = await this.getByIdTaskUseCase.handle({ id });

      return HttpResponse.ok({ ...taskRecovered });
    } catch (error) {
      return ControllerErros.handle(error);
    }
  }
};
