import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { instanceToPlain } from 'class-transformer';
import { corsConfig } from '../../src/config/cors.config';
import { setGlobalProvider } from '../../src/config/global-provider.config';
import { setSession } from '../../src/config/session.config';
import * as supertest from 'supertest';
import { UserController } from '../../src/user/controller/user.controller';
import { SignupDto } from '../../src/user/dto/signup.dto';
import { TestUserRepo } from '../../src/user/repository/test/test-user.repository';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserService } from '../../src/user/service/user.service';
import {E2eDatabase} from "../utils/e2e-db";

describe('[e2e] 유저 e2e 테스트 - user.e2e-spec.ts', () => {
    let app: INestApplication;
    let userController: UserController;
    let userService: UserService;
    let userRepository: UserRepository;
    beforeAll(async () => {
        await E2eDatabase.connect();
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useClass: TestUserRepo,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await setGlobalProvider(app);
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('[GET] /user/info', () => {
        it('세션이 없는 경우', async () => {
            const response = await supertest(app.getHttpServer()).get('/user/info').expect(200);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('잘못된 정보 요청입니다.');
            expect(response.body.data).toStrictEqual('');
        });

        it('세션이 있지만 가입한 유저가 없는 경우 (현재는 가상)', async () => {
            const fakeSession = {
                passport: {
                    user: 'test321@google.com',
                },
            };
            const response = instanceToPlain(await userController.getUserInfo(fakeSession));
            expect(response.status).toStrictEqual('error');
            expect(response.message).toStrictEqual('유저를 찾을 수 없습니다.');
        });

        it('세션도 있고 가입한 유저도 있는 경우', async () => {
            await userRepository.save(TestUserRepo.getTestUser());
            const fakeSession = {
                passport: {
                    user: TestUserRepo.getTestEmail(),
                },
            };
            const response = instanceToPlain(await userController.getUserInfo(fakeSession));
            expect(response.status).toStrictEqual('success');
            expect(response.message).toStrictEqual('');
            expect(response.data.name).toStrictEqual('테스트유저');
            expect(response.data.email).toStrictEqual(TestUserRepo.getTestEmail());
        });
    });

    describe('[POST] /user/info', () => {
        it('oauth 로 가입이라 signUp service', async () => {
            const signUpDto = new SignupDto('test@email.com', 'e2eTestUser', 'google');
            await userService.signUp(signUpDto);
            const response = await userRepository.findOne({
                where: { user_email: 'test@email.com' },
            });
            expect(response.user_email).toStrictEqual('test@email.com');
            expect(response.user_name).toStrictEqual('e2eTestUser');
            expect(response.provider_id).toStrictEqual('google');
            expect(response.create_dtm).not.toBeNull();
        });
    });

    describe('[DELETE] /user/info', () => {
        it('정상 케이스', async () => {
            const request = {
                user_email: 'test@email.com',
            };
            const response = await supertest(app.getHttpServer())
                .delete('/user/info')
                .set('Accept', 'application/json')
                .send(request);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');

            const fakeSession = {
                passport: {
                    user: 'test@email.com',
                },
            };
            const afterResponse = instanceToPlain(await userController.getUserInfo(fakeSession));
            expect(afterResponse.status).toStrictEqual('error');
            expect(afterResponse.message).toStrictEqual('유저를 찾을 수 없습니다.');
        });
    });

    afterAll(async () => {
        await E2eDatabase.close();
        await app.close();
    });
});
