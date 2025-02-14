import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppValidationError } from '@module/app.validation.error';
import { AppModule } from '@module/app.module';
import fastifyMultipart from '@fastify/multipart';
import swagger from '@module/app.swagger';

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  app
    .enableShutdownHooks()
    .setGlobalPrefix('api')
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: (errors: ValidationError[]): HttpException =>
          new AppValidationError(errors),
      }),
    )
    .enableCors({
      origin: new RegExp(
        process.env.CORS_ALLOW_ORIGIN ??
          '^(http|https):\\/\\/(localhost)(:[0-9]+)?$',
      ),
      credentials: true,
    });

  swagger(app);

  await app.register(fastifyMultipart);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
