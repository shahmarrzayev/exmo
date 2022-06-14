import { HttpExceptionFilter } from './module/auth/filters/http-exception.filter';
import { TransformInterceptor } from './module/auth/interceptors/transform.interceptor';
import { getConfig } from './common/util';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EConfig } from './common/config.enum';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  await app.listen(parseInt(getConfig(EConfig.PORT)) || 5000, () => {});
}
bootstrap();
