import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import SwaggerDocumentBuilder from './swagger/swagger-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const swaggerDocumentBuilder = new SwaggerDocumentBuilder(app, configService);
  swaggerDocumentBuilder.setupSwagger();

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX_APP);

  await app.listen(3000);
}

bootstrap();
