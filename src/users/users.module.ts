import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService], // dependency injection : service를 import 하고, controller에 주입
  exports: [UsersService], // 다른데서 쓰려면 export 해야함
})
export class UsersModule {}
