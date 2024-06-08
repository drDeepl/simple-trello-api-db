import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docBuilder = new DocumentBuilder()
    .setDescription('RESTful API схожий с trello')
    .addTag('SimpleTrelloApp')
    .build();
  const document = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('api/v1', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
