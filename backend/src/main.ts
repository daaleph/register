// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:8771/',
      'https://aleph-space.org',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-CSRF-Token',
      'CF-Access-Client-Id',
      'CF-Access-Client-Secret',
      'Access-Control-Allow-Origin',
    ],
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
