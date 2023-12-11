import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exception/http.exception';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY, // 세션 암호화에 사용하는 키로 절대 노출되서는 안된다.
      resave: false, // 세션을 항상 저장할 지 여부라 일단 false
      saveUninitialized: false, // 세션이 저장되기 전에는 초기화 하지 않은 상태로 세션을 미리 만들어 저장할지? 일단 false
      cookie: { maxAge: 3600000 }, // 쿠키 유효시간 = 일단 1시간 주었다.
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());






  const config = new DocumentBuilder()
    .setTitle('board')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
