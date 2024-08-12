import { Injectable } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [{
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },];

      async findUser(userName:string):Promise<User | undefined>{
        console.log(userName);
        return this.users.find(user => user.username === userName);
      }
}
