import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './schema/todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async createTask(title: string, desc: string, user: string) {
    const newTask = new this.todoModel({ title, description: desc, user });
    const result = await newTask.save();
    return result;
  }

  async getAllTasks(userId: string) {
    const tasks = await this.todoModel.find({user: userId}).exec();
    return tasks;
  }

  async getTask(taskId: string) {
    const task = await this.todoModel.findById(taskId);
    if (!task) {
      throw new NotFoundException('No task with given ID');
    }

    return task;
  }

  async updateTask(
    taskId: string,
    title: string,
    desc: string,
    completed: boolean,
  ) {
    const updatedTask = await this.todoModel.findById(taskId);
    if (!updatedTask) {
      throw new NotFoundException('No task with given ID');
    }
    if (title) {
      updatedTask.title = title;
    }
    if (desc) {
      updatedTask.description = desc;
    }
    if (completed) {
      updatedTask.completed = completed;
    }
    updatedTask.save();
    return updatedTask;
  }

  async deleteTask(taskId: string) {
    const task = await this.todoModel.findByIdAndDelete(taskId);
    if (!task) {
      throw new NotFoundException('No task with the given ID');
    }
    return task;
  }
}
