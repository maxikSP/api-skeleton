import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export default (context: INestApplication): void => {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Skeleton api.')
    .setDescription('Skeleton api.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'jwt' },
      'jwt',
    )
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(context, config);

  SwaggerModule.setup('/api/docs', context, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
