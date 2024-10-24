import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: string): User {
    const user = this.users.find(user => user.userId === parseInt(id));
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  deleteOne(id: string): boolean {
    this.users = this.users.filter(user => user.userId !== parseInt(id));
    return true;
  }

  create(userData) {
    this.users.push({
      userId: this.users.length + 1,
      ...userData
    })
    return userData;
  }

  update(id: string, updateData) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({...user, ...updateData});
  }
}
