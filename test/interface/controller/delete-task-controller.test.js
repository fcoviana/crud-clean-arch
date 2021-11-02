const DeleteTaskUseCase = require('../../../src/app/use-case/task/delete/delete-task');
const DeleteTaskController = require('../../../src/interface/controllers/task/delete-task-controller');
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

  const deleteTaskUseCase = new DeleteTaskUseCase({
    taskRepository: taskRepositorySpy
  });

  const sut = new DeleteTaskController(deleteTaskUseCase);

  return {
    sut,
    task,
    httpRequest,
    taskRepositorySpy,
    deleteTaskUseCase
  }
}

const mockReturnTaskRepository = (taskRepositorySpy, task) => {
  const mockReturn = { ...task };
  taskRepositorySpy.destroy.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("controller: delete task", () => {

  test("Should return status code 200", async () => {
    const { sut, task, httpRequest, taskRepositorySpy } = makeSut();
    mockReturnTaskRepository(taskRepositorySpy, task);

    const { statusCode } = await sut.handle(httpRequest);

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

  test("Should instantiate a controller without a useCase", async () => {
    const { httpRequest } = makeSut();
    const sut = new DeleteTaskController();

    const response = await sut.handle(httpRequest);
    expect(response).toEqual({ "body": { "error": "" }, "statusCode": 500 });
  });

});
