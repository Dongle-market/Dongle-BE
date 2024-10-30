import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable() // dependency injection
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOne(id: number): Promise<User> { // id가 number로 넘어오기 때문에 parseInt 필요없음
    const user = await this.usersRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  async getOneByKakaoId(kakaoId: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { kakaoId } });
    return user;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, updateData: UpdateUserDto) {
    await this.usersRepository.update(id, updateData);
    return this.getOne(id);
  }
}
