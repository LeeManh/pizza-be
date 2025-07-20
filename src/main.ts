import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { UnprocessableEntityResponse } from './commons/types/response.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory(errors) {
        const formatErrors = {};

        errors.forEach((error) => {
          const field = error.property;
          formatErrors[field] = Object.values(error.constraints || {});
        });

        const response: UnprocessableEntityResponse = {
          message: 'Validation failed',
          errors: formatErrors,
        };

        return new UnprocessableEntityException(response);
      },
    }),
  );
  app.setGlobalPrefix('api');
  const configService = new ConfigService();
  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
