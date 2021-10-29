const ExpressRouterAdapter = require('../../../src/infra/adapters/express-router-adapter');

const makeSut = () => {
  const sut = ExpressRouterAdapter;

  return { sut };
}

describe("adapter: express-router", () => {

  test.only("Should return instanceof ExpressRouterAdapter", async () => {
    const { sut } = makeSut();
    expect(new sut()).toBeInstanceOf(ExpressRouterAdapter);
  }); 

});
