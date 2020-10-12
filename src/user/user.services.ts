import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schema/user.model';
import { Todo } from './../todo/schema/todo.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(name: string, email: string, age: number) {
    const newUser = new this.userModel({ name, email, age });
    const result = await newUser.save();
    return result;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    console.log(users);
    return users;
  }

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId).populate('todos');
    if (!user) {
      throw new NotFoundException('No user with given ID');
    }
    console.log(user);
    return user;
  }

  async updateUser(
    userId: string,
    name: string,
    email: string,
    age: number,
    todos: [string],
  ) {
    const updateduser = await this.userModel.findById(userId);
    if (!updateduser) {
      throw new NotFoundException('No user with given ID');
    }
    if (name) {
      updateduser.name = name;
    }
    if (email) {
      updateduser.email = email;
    }
    if (age) {
      updateduser.age = age;
    }
    if (todos) {
      updateduser.todos.push(...todos);
    }
    updateduser.save();
    return updateduser;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('No user with the given ID');
    }
    return user;
  }
}
