module.exports = class ExpressRouterAdapter {
  static adapt(router) {
    return async (request, response) => {
      const httpRequest = {
        body: request.body,
        params: request.params
      };

      const httpResponse = await router.handle(httpRequest);
      response.status(httpResponse.statusCode).json(httpResponse);
    };
  }
};
