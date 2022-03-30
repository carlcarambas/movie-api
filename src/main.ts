import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerConfig } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    SwaggerConfig.jsonDoc,
    app,
    SwaggerModule.createDocument(app, SwaggerConfig.swaggerConfig),
    SwaggerConfig.customOptions,
  );
  await app.listen(3000);
}
bootstrap();
