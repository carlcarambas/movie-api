import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export class SwaggerConfig {
  static swaggerConfig = new DocumentBuilder()
    .setTitle('Movie API')
    .addServer('http://localhost:3200/docs')
    .setDescription('Movie API calls')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  static customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Doc',
  };

  static jsonDoc = 'api-doc';
}
