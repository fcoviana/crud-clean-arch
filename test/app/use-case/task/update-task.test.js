const UpdateTaskUseCase = require('../../../../src/app/use-case/task/update/update-task');
const OutputBoundary = require('../../../../src/app/use-case/task/update/output-boundary');
const TaskRepositorySpy = require('../../../mocks/task-repository');

const makeTaskData = () => ({
  id: 'any-id',
  title: 'any-title',
  description: 'any-description'
})

const makeSut = () => {
  const taskRepositorySpy = new TaskRepositorySpy();;
  const task = makeTaskData();

  const sut = new UpdateTaskUseCase({
    taskRepository: taskRepositorySpy
  });

  return {
    sut,
    task,
    taskRepositorySpy
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = { ...task };
  taskRepositorySpy.update.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: update task", () => {

  test("Should return task", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    const expected = mockReturnTaskRepository(taskRepositorySpy, task);

    const taskUpdated = await sut.handle(task);

    expect(taskUpdated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    const expected = mockReturnTaskRepository(taskRepositorySpy, task);

    const taskUpdated = await sut.handle(task);

    expect(taskUpdated).toBeInstanceOf(OutputBoundary);
  });

  test("Should call handle", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, task);

    await sut.handle(task);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(task);
  });

  test("Should call update", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, task);
    jest.spyOn(taskRepositorySpy, 'update');
    await sut.handle(task);

    expect(taskRepositorySpy.update).toHaveBeenCalled();
    expect(taskRepositorySpy.update).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.update).toHaveBeenCalledWith(task);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new UpdateTaskUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
