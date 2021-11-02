const GetByIdTasksUseCase = require('../../../src/app/use-case/task/get-by-id/get-by-id-task');
const GetByIdTasksController = require('../../../src/interface/controllers/task/get-by-id-task-controller');
const TaskRepositorySpy = require('../../mocks/task-repository');
const { NotFoundError } = require('../../../src/shared/utils/errors');

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
  const httpRequest = makeHttpRequest({ params: task.id });

  const getByIdTaskUseCase = new GetByIdTasksUseCase({
    taskRepository: taskRepositorySpy
  });

  const sut = new GetByIdTasksController(getByIdTaskUseCase);

  return {
    sut,
    task,
    httpRequest,
    taskRepositorySpy,
    getByIdTaskUseCase
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = { ...task };
  taskRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: get by id task", () => {

  test("Should return task", async () => {
    const { sut, task, httpRequest, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, task);

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual(task);
    expect(statusCode).toBe(200);
  });

  test("Should return NotFound", async () => {
    const { sut, httpRequest, taskRepositorySpy } = makeSut();
    taskRepositorySpy.fetchOne.mockImplementation(() => {
      throw new NotFoundError(`Task not found!`);
    });

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual({
      error: "NotFoundError",
      message: "Task not found!",
    });
    expect(statusCode).toBe(404);
  });

  test("Should call handle", async () => {
    const { sut, task, httpRequest, taskRepositorySpy } = makeSut();

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

  test("Should instantiate a controller without a useCase", async () => {
    const { httpRequest } = makeSut();
    const sut = new GetByIdTasksController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
