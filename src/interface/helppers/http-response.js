const { ServerError } = require('../../shared/utils/errors');
module.exports = class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.name,
        message: error.message,
      },
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: new ServerError().message,
      },
    };
  }

  static unauthorizedError(error) {
    return {
      statusCode: 401,
      body: {
        error: error.name,
        message: error.message,
      },
    };
  }

  static notFoundError(error) {
    return {
      statusCode: 404,
      body: {
        error: error.name,
        message: error.message,
      },
    };
  }

  static ok(data) {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static created(data) {
    return {
      statusCode: 201,
      body: data,
    };
  }
};
