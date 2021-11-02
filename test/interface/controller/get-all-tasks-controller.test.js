const GetAllTasksUseCase = require('../../../src/app/use-case/task/get-all/get-all-tasks');
const GetAllTasksController = require('../../../src/interface/controllers/task/get-all-tasks-controller');
const TaskRepositorySpy = require('../../mocks/task-repository');

const makeTaskSpyData = () => ({
  id: 'any-id',
  title: 'any-title',
  description: 'any-description'
});

const makeHttpRequest = ({ body, params }) => ({
  body,
  params
});

const makeSut = () => {
  const taskRepositorySpy = new TaskRepositorySpy();
  const task = makeTaskSpyData();
  const httpRequest = makeHttpRequest({ body: task });

  const getAllTasksUseCase = new GetAllTasksUseCase({
    taskRepository: taskRepositorySpy
  });

  const sut = new GetAllTasksController(getAllTasksUseCase);

  return {
    sut,
    task,
    httpRequest,
    taskRepositorySpy,
    getAllTasksUseCase
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = [{ ...task }, { ...task }];
  taskRepositorySpy.fetchAll.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: getAll tasks", () => {

  test("Should return tasks", async () => {
    const { sut, task, taskRepositorySpy } = makeSut();
    const expected = mockReturnTaskRepository(taskRepositorySpy, task);

    const { body, statusCode } = await sut.handle();

    expect(body).toEqual(expected);
    expect(statusCode).toBe(200);
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

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    const response = await sut.handle();
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });
});
