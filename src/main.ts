import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { logger } from './common/logger.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // app.useGlobalInterceptors(new ResponseInterceptor());

  // app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Avito Title')
    .setDescription('Документация API · [Скачать Swagger JSON](/swagger.json)')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, documentFactory, {
    jsonDocumentUrl: '/swagger.json',
    customSiteTitle: 'Avito swagger docks',
  });
  app.use(logger);

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
await bootstrap();
