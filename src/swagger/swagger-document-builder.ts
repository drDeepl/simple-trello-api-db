import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUI } from './swagger-ui.class';

class SwaggerDocumentBuilder {
  constructor(
    private readonly app: INestApplication<any>,
    private readonly configService: ConfigService<Record<string, unknown>>,
  ) {}

  private buildConfig() {
    const docBuilder = new DocumentBuilder()
      .setTitle('SimpleTrelloApp')
      .addServer(this.configService.get('APP_URL'))
      .setDescription('RESTful API схожий с trello')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          bearerFormat: 'bearer',
          scheme: 'bearer',
          in: 'header',
        },
        'JWT-Auth',
      )
      .addSecurityRequirements('JWT-auth');

    return docBuilder.build();
  }

  private createDocument() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config);
  }

  public setupSwagger() {
    const document = this.createDocument();
    const swaggerUI = new SwaggerUI(this.configService.get('APP_URL'));
    SwaggerModule.setup(
      this.configService.get('SWAGGER_URL'),
      this.app,
      document,
      swaggerUI.customOptions,
    );
  }
}

export default SwaggerDocumentBuilder;
