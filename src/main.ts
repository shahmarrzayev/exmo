import { getConfig } from './common/util';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EConfig } from './common/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(parseInt(getConfig(EConfig.PORT)) || 5000);
}
bootstrap();
