import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export class SwaggerConfig {
  static swaggerConfig = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('Movie API calls')
    .setVersion('0.1')
    .build();

  static customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Doc',
  };

  static jsonDoc = 'api-doc';
}
