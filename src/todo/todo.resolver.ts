import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.services';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query('tasks')
  async getAllTasks(@Args('id') userId: string, @Args('page') pageNo: number, @Args('max') perPage: number) {
    let tasks = await this.todoService.getAllTasks(userId);
    if(pageNo && perPage) {
      tasks = tasks.slice((pageNo-1) * perPage, pageNo * perPage)
    }
    console.log(tasks);
    return tasks;
  }

  @Query('task')
  async getTask(@Args('id') taskId: string) {
    const task = await this.todoService.getTask(taskId);
    return task;
  }
  
  @Mutation('createTask')
  async createTask(
    @Args('title') taskTitle: string,
    @Args('description') taskDesc: string,
    @Args('user') userId: string,
  ) {
    const task = await this.todoService.createTask(taskTitle, taskDesc, userId);
    return task;
  }

  @Mutation('updateTask')
  async updateTask(
    @Args('id') taskId: string,
    @Args('title') taskTitle: string,
    @Args('description') taskDesc: string,
    @Args('completed') taskCompleted: boolean,
  ) {
    const updatedTask = await this.todoService.updateTask(
      taskId,
      taskTitle,
      taskDesc,
      taskCompleted,
    );
    return updatedTask;
  }


  @Mutation('deleteTask')
  async deleteTask(@Args('id') taskId: string) {
    const id = await this.todoService.deleteTask(taskId);
    return id;
  }
}
