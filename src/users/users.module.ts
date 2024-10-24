import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService] // dependency injection : service를 import 하고, controller에 주입
})
export class UsersModule {}
