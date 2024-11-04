import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable() // dependency injection
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /** userId로 해당하는 회원 검색 */
  async getOne(id: number): Promise<User> { // id가 number로 넘어오기 때문에 parseInt 필요없음
    const user = await this.usersRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  /** 카카오id로 기존유저 검증 */
  async getOneByKakaoId(kakaoId: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { kakaoId: kakaoId } });
    return user;
  }

  /** 회원가입 */
  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, updateData: UpdateUserDto) {
    await this.usersRepository.update(id, updateData);
    return this.getOne(id);
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
