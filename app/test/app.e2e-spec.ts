import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { corsConfig } from '../src/config/cors.config';
import { setGlobalProvider } from '../src/config/global-provider.config';
import { setSession } from '../src/config/session.config';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await setGlobalProvider(app);
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();
    });
    it('should be defined', () => {
        expect(app).toBeDefined();
    });
    afterAll(async () => {
        await app.close();
    });
});
