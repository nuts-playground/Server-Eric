import { NestFactory, Reflector } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http.exception';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors.config';
import { setSession } from './config/session.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await setSession(app);
    // const config = new DocumentBuilder()
    //     .setTitle('board')
    //     .setDescription('The board API description')
    //     .setVersion('1.0')
    //     .addTag('board')
    //     .build();
    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('api', app, document);
    app.enableCors(corsConfig.getConfig());
    await app.listen(process.env['SERVER_PORT']);
}
bootstrap();
