import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  @Get()
  getAll() {
    return "This will return all users";
  }

  @Get("/:id")
  getOne(@Param("id") userId: string) {
    return `This will return one user ${userId}`;
  }

  @Post()
  create() {
    return "This will create a user";
  }

  @Delete("/:id")
  remove(@Param("id") userId: string) {
    return `This will delete a user ${userId}`;
  }
}
