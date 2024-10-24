import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  // 컨트롤러 : express의 라우터와 같은 역할, url을 가져오고 함수를 실행
  providers: [],
})
export class AppModule {}
