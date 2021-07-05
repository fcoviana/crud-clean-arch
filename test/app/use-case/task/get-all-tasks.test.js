const GetAllTasksUseCase = require('../../../../src/app/use-case/task/get-all/get-all-tasks');
const OutputBoundary = require('../../../../src/app/use-case/task/get-all/output-boundary');
const TaskRepositorySpy = require('../../../mocks/task-repository');

const makeTaskData = () => ([
  {
    id: 'any-id',
    title: 'any-title',
    description: 'any-description'
  },
  {
    id: 'any-id',
    title: 'any-title',
    description: 'any-description'
  },
])

const makeSut = () => {
  const taskRepositorySpy = new TaskRepositorySpy();;
  const tasks = makeTaskData();

  const sut = new GetAllTasksUseCase({
    taskRepository: taskRepositorySpy
  });

  return {
    sut,
    tasks,
    taskRepositorySpy
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, tasks) => {
  const mockReturn = [...tasks];
  taskRepositorySpy.fetchAll.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: get all tasks", () => {

  test("Should return tasks", async () => {
    const { sut, tasks, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    const expected = mockReturnTaskRepository(taskRepositorySpy, tasks);

    const taskList = await sut.handle();

    expect(taskList).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, tasks, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, tasks);

    const taskList = await sut.handle();
    taskList.forEach(task => {
      expect(task).toBeInstanceOf(OutputBoundary);
    });
  });

  test("Should call handle", async () => {
    const { sut, tasks, taskRepositorySpy } = makeSut();
    jest.spyOn(sut, sut.handle.name);
    mockReturnTaskRepository(taskRepositorySpy, tasks);

    await sut.handle();

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
  });

  test("Should call fetchAll", async () => {
    const { sut, tasks, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, tasks);
    jest.spyOn(taskRepositorySpy, 'fetchAll');
    await sut.handle();

    expect(taskRepositorySpy.fetchAll).toHaveBeenCalled();
    expect(taskRepositorySpy.fetchAll).toHaveBeenCalledTimes(1);
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new GetAllTasksUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'fetchAll' of undefined");
  });

});
