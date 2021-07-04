const GetByIdTaskUseCase = require('../../../../src/app/use-case/task/get-by-id/get-by-id-task');
const OutputBoundary = require('../../../../src/app/use-case/task/get-by-id/output-boundary');
const TaskRepositorySpy = require('../../../mocks/task-repository');

const makeTaskData = () => ({
  id: 'any-id'
})

const makeSut = () => {
  const taskRepositorySpy = new TaskRepositorySpy();;
  const taskId = makeTaskData();

  const sut = new GetByIdTaskUseCase({
    taskRepository: taskRepositorySpy
  });

  return {
    sut,
    taskId,
    taskRepositorySpy
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, taskId) => {
  const mockReturn = { ...taskId, title: 'any-title', description: 'any-description' };
  taskRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: get by id task", () => {

  test("Should return task", async () => {
    const { sut, taskId, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    const expected = mockReturnTaskRepository(taskRepositorySpy, taskId);

    const task = await sut.handle(taskId);

    expect(task).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, taskId, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, taskId);

    const task = await sut.handle(taskId);

    expect(task).toBeInstanceOf(OutputBoundary);
  });

  test("Should call handle", async () => {
    const { sut, taskId, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, taskId);

    await sut.handle(taskId);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(taskId);
  });

  test("Should call fetchOne", async () => {
    const { sut, taskId, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, taskId);
    jest.spyOn(taskRepositorySpy, 'fetchOne');
    await sut.handle(taskId);

    expect(taskRepositorySpy.fetchOne).toHaveBeenCalled();
    expect(taskRepositorySpy.fetchOne).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.fetchOne).toHaveBeenCalledWith(taskId);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new GetByIdTaskUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
