import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  // @Get('search')
  // search(@Query("year") searchingYear: string) {
  //   return `This will search for a user: after ${searchingYear}`;
  // }

  @Get(":id") // 파라미터 받아오는걸 쿼리보다 뒤에쓰자
  getOne(@Param("id") userId: string): User {
    return this.usersService.getOne(userId);
  }

  @Post()
  create(@Body() userData) {
    return this.usersService.create(userData);
  }

  @Delete(":id")
  remove(@Param("id") userId: string) {
    return this.usersService.deleteOne(userId);
  }

  @Patch(":id")
  patch(@Param("id") userId: string, @Body() userData) {
    return {
      updatedUser: userId,
      ...userData,
    }
  }


}
