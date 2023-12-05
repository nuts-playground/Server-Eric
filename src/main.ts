import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HttpExceptionFilter} from "./exception/http.exception";
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    const config = new DocumentBuilder()
        .setTitle('board')
        .setDescription('The board API description')
        .setVersion('1.0')
        .addTag('board')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
