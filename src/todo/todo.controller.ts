import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.services';

@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async insertTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDesc: string,
  ) {
    const generatedId = await this.todoService.createTask(taskTitle, taskDesc);
    return { id: generatedId };
  }

  @Get()
  async getAllTasks() {
    const tasks = await this.todoService.getAllTasks();
    return tasks;
  }

  @Get(':id')
  async getTask(@Param('id') taskId: string) {
    const task = await this.todoService.getTask(taskId);
    return task;
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('description') taskDesc: string,
    @Body('completed') taskCompleted: boolean,
  ) {
    await this.todoService.updateTask(
      taskId,
      taskTitle,
      taskDesc,
      taskCompleted,
    );
    return null;
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    await this.todoService.deleteTask(taskId);
    return null;
  }
}
