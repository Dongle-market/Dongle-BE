import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('apis/user')
export class UsersController {

  constructor(private readonly usersService: UsersService) {} // dependency injection
  
  /** 전체 회원 리스트 */
  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  /** 회원 정보 */
  @Get('my')
  async getMyProfile(@Req() req: Request): Promise<User> {
    const userId = req['userId'];
    const user = await this.usersService.getOne(userId);
    if (!user) {
      throw new NotFoundException(`해당 유저를 찾을 수 없습니다.`);
    }
    return user;
  }

  @Get(":id") // 파라미터 받아오는걸 쿼리보다 뒤에쓰자
  getOne(@Param("id") userId: number): Promise<User> { // 파라미터가 string으로 넘어와 Number로 변환해야 하는데, pipe의 transform: true가 해줌
    return this.usersService.getOne(userId);
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return await this.usersService.create(userData);
  }

  @Delete(":id")
  remove(@Param("id") userId: number): Promise<void> {
    return this.usersService.deleteOne(userId);
  }

  @Patch(":id")
  patch(@Param("id") userId: number, @Body() updateData: UpdateUserDto): Promise<User> {
    return this.usersService.update(userId, updateData)
  }


}
