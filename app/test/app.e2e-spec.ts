import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { BoardModule } from '../src/board/board.module';
import { corsConfig } from '../src/config/cors.config';
import { setGlobalProvider } from '../src/config/global-provider.config';
import { mysqlConfig } from '../src/config/mysql.config';
import { setSession } from '../src/config/session.config';
import { UserModule } from '../src/user/user.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                UserModule,
                BoardModule,
                TypeOrmModule.forRoot(mysqlConfig.getConfig()),
            ],
        }).compile();
        app = module.createNestApplication();
        await setGlobalProvider(app);
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();
    });

    describe('base test', () => {
        it('base test', async () => {
            expect(true).toEqual(true);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
