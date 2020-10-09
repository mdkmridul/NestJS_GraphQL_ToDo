import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.services';
import { TodoSchema } from './schema/todo.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
