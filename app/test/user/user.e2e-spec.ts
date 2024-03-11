import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { corsConfig } from '../../src/config/cors.config';
import { setGlobalProvider } from '../../src/config/global-provider.config';
import { mysqlConfig } from '../../src/config/mysql.config';
import { setSession } from '../../src/config/session.config';
import * as supertest from 'supertest';
import { UserController } from '../../src/user/controller/user.controller';
import { SignupDto } from '../../src/user/dto/signup.dto';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserService } from '../../src/user/service/user.service';

describe('[e2e] 유저 e2e 테스트 - user.e2e-spec.ts', () => {
    let app: INestApplication;
    let userController: UserController;
    let userService: UserService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                UserRepository,
                {
                    provide: DataSource,
                    useValue: mysqlConfig.getTestDataSource,
                },
            ],
            exports: [UserService],
        }).compile();

        app = module.createNestApplication();
        await setGlobalProvider(app);
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();
        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    // describe('[GET] /user/info', () => {
    //     it('세션이 없는 경우', async () => {
    //         const response = await supertest(app.getHttpServer()).get('/user/info').expect(200);
    //
    //         expect(response.body.status).toEqual('error');
    //         expect(response.body.message).toEqual('정보가 존재하지 않습니다.');
    //         expect(response.body.data).toEqual('');
    //     });
    // });

    // describe('[POST] /user/info', () => {
    //     it('유저가 있는 경우 성공', async () => {
    //         const testUser = new SignupDto('seokho@test.com', 'seokho', 'naver');
    //         await userService.signUp(testUser);
    //         const testDeleteUserEmail = { user_email: 'seokho@test.com' };
    //         const response = await supertest(app.getHttpServer())
    //             .delete('/user/info')
    //             .set('Accept', 'application/json')
    //             .send(testDeleteUserEmail);
    //
    //         expect(response.body.status).toEqual('success');
    //         expect(response.body.message).toEqual('');
    //     });
    //
    //     it('유저가 없는 경우 실패', async () => {
    //         const failTestDeleteUserEmail = { user_email: 'seokho@test.com' };
    //         const response = await supertest(app.getHttpServer())
    //             .delete('/user/info')
    //             .set('Accept', 'application/json')
    //             .send(failTestDeleteUserEmail);
    //
    //         expect(response.body.status).toEqual('error');
    //         expect(response.body.message).toEqual('존재하지 않는 유저입니다.');
    //     });
    // });
    //
    // afterAll(async () => {
    //     await app.close();
    // });
});
