import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerOn(reqApp: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Seokho Web API Docs')
        .setDescription('Seokho Web API 문서에 오신 것을 환영합니다!')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();

    const document = SwaggerModule.createDocument(reqApp, config);
    SwaggerModule.setup('api-docs', reqApp, document);
}
