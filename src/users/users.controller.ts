import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {} // dependency injection
  
  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  // @Get('search')
  // search(@Query("year") searchingYear: string) {
  //   return `This will search for a user: after ${searchingYear}`;
  // }

  @Get(":id") // 파라미터 받아오는걸 쿼리보다 뒤에쓰자
  getOne(@Param("id") userId: number): User { // 파라미터가 string으로 넘어와 Number로 변환해야 하는데, pipe의 transform: true가 해줌
    return this.usersService.getOne(userId);
  }

  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Delete(":id")
  remove(@Param("id") userId: number) {
    return this.usersService.deleteOne(userId);
  }

  @Patch(":id")
  patch(@Param("id") userId: number, @Body() updateData: UpdateUserDto) {
    return this.usersService.update(userId, updateData)
  }


}
