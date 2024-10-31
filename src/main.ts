import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // 유저들이 보낸 데이터를 우리의 타입으로 변환해줌
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
