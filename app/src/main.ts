import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { AppModule } from './app.module';
import { setGlobalProvider } from './config/global-provider.config';
import { setSession } from './config/session.config';
import { swaggerOn } from './config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await setGlobalProvider(app);
    await setSession(app);
    await swaggerOn(app);
    await app.listen(process.env['SERVER_PORT']);
}
bootstrap();
