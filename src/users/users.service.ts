import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: string): User {
    return this.users.find(user => user.userId === parseInt(id));
  }

  deleteOne(id: string): boolean {
    this.users.filter(user => user.userId !== parseInt(id));
    return true;
  }

  create(userData) {
    this.users.push({
      userId: this.users.length + 1,
      ...userData
    })
    return userData;
  }
}
