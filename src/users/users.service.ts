import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable() // dependency injection
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User { // id가 number로 넘어오기 때문에 parseInt 필요없음
    const user = this.users.find(user => user.userId === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  deleteOne(id: number): boolean {
    this.users = this.users.filter(user => user.userId !== id);
    return true;
  }

  create(userData: CreateUserDto) {
    this.users.push({
      userId: this.users.length + 1,
      ...userData
    })
    return userData;
  }

  update(id: number, updateData: UpdateUserDto) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({...user, ...updateData});
  }
}
