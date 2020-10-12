import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.services';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async getUser(@Args('id') userId: string) {
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Query('users')
  async getAllUsers(){
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Mutation('createUser')
  async createUser(@Args('name') name: string, @Args('email') email: string, @Args('age') age: number){
    const user = await this.userService.createUser(name, email, age)
    return user;
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('id') userId: string,
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('age') age: number,
    @Args('todos') todos: [string],
  ) {
    const updatedTask = await this.userService.updateUser(
      userId,
      name,
      email,
      age,
      todos,
      );
    return updatedTask;
  }
}