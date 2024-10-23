import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  // 컨트롤러 : express의 라우터와 같은 역할, url을 가져오고 함수를 실행
  providers: [],
})
export class AppModule {}
