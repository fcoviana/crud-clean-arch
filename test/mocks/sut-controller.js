module.exports = class SutControllerSpy {
  async handle(httpRequest) {
    return {
      statusCode: 'any-code',
      body: {},
    };
  }
}