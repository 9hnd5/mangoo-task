import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { default as Redis } from 'ioredis';
import { useContainer } from 'class-validator';
export const redis = new Redis(6379);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3001);
}
bootstrap();
