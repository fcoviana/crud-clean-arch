const CreateTaskUseCase = require('../../../../src/app/use-case/task/create/create-task');
const OutputBoundary = require('../../../../src/app/use-case/task/create/output-boundary');
const TaskRepositorySpy = require('../../../mocks/task-repository');

const makeTaskData = () => ({
  title: 'any-title',
  description: 'any-description'
})

const makeSut = () => {
  const taskRepositorySpy = new TaskRepositorySpy();;
  const task = makeTaskData();

  const sut = new CreateTaskUseCase({
    taskRepository: taskRepositorySpy
  });

  return {
    sut,
    task,
    taskRepositorySpy
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = { id: 'any-id', ...task };
  taskRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: create task", () => {

  test("Should return task", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    const expected = mockReturnTaskRepository(taskRepositorySpy, task);

    const taskCreated = await sut.handle(task);

    expect(taskCreated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, task);

    const taskCreated = await sut.handle(task);

    expect(taskCreated).toBeInstanceOf(OutputBoundary);
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

  test("Should call create", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, task);
    jest.spyOn(taskRepositorySpy, 'create');
    await sut.handle(task);

    expect(taskRepositorySpy.create).toHaveBeenCalled();
    expect(taskRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.create).toHaveBeenCalledWith(task);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'title' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new CreateTaskUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'title' of undefined");
  });

});
