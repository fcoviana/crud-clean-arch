const CreateTaskUseCase = require('../../../src/app/use-case/task/create/create-task');
const CreateTaskController = require('../../../src/interface/controllers/task/create-task-controller');
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

  const createTaskUseCase = new CreateTaskUseCase({
    taskRepository: taskRepositorySpy
  });

  const sut = new CreateTaskController(createTaskUseCase);

  return {
    sut,
    task,
    httpRequest,
    taskRepositorySpy,
    createTaskUseCase
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = { ...task };
  taskRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: create task", () => {

  test("Should return task", async () => {
    const { sut, task, httpRequest, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, task);

    const { body, statusCode } = await sut.handle(httpRequest);

    expect(body).toEqual(task);
    expect(statusCode).toBe(201);
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

  test("Should instantiate a controller without a useCase", async () => {
    const { httpRequest } = makeSut();
    const sut = new CreateTaskController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
