const ExpressRouterAdapter = require('../../../src/infra/adapters/express-router-adapter');
const SutControllerSpy = require('../../mocks/sut-controller');

const makeSut = () => {
  const sut = ExpressRouterAdapter;
  const sutControllerSpy = new SutControllerSpy();

  return { 
    sut,
    sutControllerSpy,
   };
}

describe("adapter: express-router", () => {

  test("Should return instanceof ExpressRouterAdapter", async () => {
    const { sut } = makeSut();
    expect(new sut()).toBeInstanceOf(ExpressRouterAdapter);
  });

  test("Should call adapt", async () => {
    const { sut, sutControllerSpy } = makeSut();
    jest.spyOn(sut, sut.adapt.name);
    
    await sut.adapt(sutControllerSpy);

    expect(sut.adapt).toHaveBeenCalled();
    expect(sut.adapt).toHaveBeenCalledTimes(1);
    expect(sut.adapt).toHaveBeenCalledWith(sutControllerSpy);
  });

});
