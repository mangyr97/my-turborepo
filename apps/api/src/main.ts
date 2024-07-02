import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger, ZodValidationPipe } from '@anatine/zod-nestjs';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api');
  app.disable('x-powered-by');
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 60, // limit each IP to 60 requests per windowMs
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.useGlobalPipes( new ZodValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      authActions: {
        login: {
          name: 'login',
          description: 'Login',
          // Передаем имя куки, которую используем для передачи токена
          // Это значение должно совпадать с именем куки, которую устанавливаем в контроллере авторизации
          // По умолчанию это 'access_token'
          // Если используем несколько кук, то передаем массив имен
          cookie: ['access_token', 'refresh_token'],
          // Передаем схему авторизации
          // В данном случае используем тип 'apiKey', так как передаем токен в куки
          schema: {
            type: 'apiKey',
            in: 'cookie',
            name: 'access_token',
            description: 'Access token',
          },
        },
      },
    },
  });
  await app.listen(parseInt(process.env.PORT) || 3000);
  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
