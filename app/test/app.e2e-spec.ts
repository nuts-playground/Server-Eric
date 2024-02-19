import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { BoardModule } from '../src/board/board.module';
import { HttpExceptionFilter } from '../src/common/exception/http.exception';
import { corsConfig } from '../src/config/cors.config';
import { mysqlConfig } from '../src/config/mysql.config';
import { setSession } from '../src/config/session.config';
import { UserModule } from '../src/user/user.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                UserModule,
                BoardModule,
                TypeOrmModule.forRoot(mysqlConfig.getConfig()),
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalInterceptors(
            new ClassSerializerInterceptor(app.get(Reflector)),
        );
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        app.useGlobalFilters(new HttpExceptionFilter());
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();
    });

    it('/ (GET)', () => {
        console.log('test');
    });
});
