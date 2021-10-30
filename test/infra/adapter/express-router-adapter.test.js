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

  test("Should call router", async () => {
    const { sut, sutControllerSpy } = makeSut();
    const httpRequest = {
      body: {},
      params: {},
    };
    jest.spyOn(sutControllerSpy, 'handle');
    await sut.adapt(sutControllerSpy)(httpRequest, {
      status() {
        return this;
      },

      json() {
        return this;
      }
    });

    expect(sutControllerSpy.handle).toHaveBeenCalled();
    expect(sutControllerSpy.handle).toHaveBeenCalledTimes(1);
    expect(sutControllerSpy.handle).toHaveBeenCalledWith(httpRequest);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.adapt()).rejects.toThrow();
    await expect(sut.adapt()).rejects.toThrow(TypeError);
    await expect(sut.adapt()).rejects.toThrow("Cannot read property 'body' of undefined");
  });
  
});
