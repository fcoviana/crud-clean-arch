const CreateTaskUseCase = require('../../../../src/app/use-case/task/create/create-task');

const makeTaskRepositorySpy = () => {
  class TaskRepositorySpy {
    create = jest.fn();
  }

  return new TaskRepositorySpy();
}

const makeTaskData = () => ({
  title: 'any-title',
  description: 'any-description'
})


const makeSut = () => {
  const taskRepositorySpy = makeTaskRepositorySpy();
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
  taskRepositorySpy.create.mockReturnValue({ id: 'any-id', ...task});
}

describe("use-case: create task", () => {
  // const { sut, task, taskRepositorySpy } = makeSut();
  // jest.spyOn(sut, sut.handle.name);
  // taskRepositorySpy.create.mockReturnValue({ id: 'any-id', ...task});
  // jest.spyOn(taskRepositorySpy, 'create');

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

});
