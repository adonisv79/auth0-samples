import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.SEC_CORS_ALLOWED_ORIGINS) {
    app.enableCors({
      origin: process.env.SEC_CORS_ALLOWED_ORIGINS,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type'],
    });
  }
  await app.listen(process.env.API_PORT ?? 5000);
}
bootstrap();
