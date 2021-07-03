const { NotFoundError } = require('../../shared/utils/errors');
const HttpResponse = require('../helppers/http-response');

module.exports = class ControllerErrors {
  static handle(error) {
    if (error instanceof NotFoundError) return HttpResponse.notFoundError(error);

    return HttpResponse.serverError(error);
  }
};
