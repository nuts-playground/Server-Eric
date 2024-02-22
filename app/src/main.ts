import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';
import { setGlobalProvider } from './config/global-provider.config';
import { setSession } from './config/session.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await setGlobalProvider(app);
    await setSession(app);
    // const config = new DocumentBuilder()
    //     .setTitle('board')
    //     .setDescription('The board API description')
    //     .setVersion('1.0')
    //     .addTag('board')
    //     .build();
    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('api', app, document);
    await app.listen(process.env['SERVER_PORT']);
}
bootstrap();
