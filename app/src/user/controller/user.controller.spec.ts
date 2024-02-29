import { Test, TestingModule } from '@nestjs/testing';
import { instanceToPlain } from 'class-transformer';
import { EmailDto } from '../dto/email.dto';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('유저 컨트롤러 테스트', () => {
    let userController: UserController;
    let userService: UserService;
    const convertPlain = (param) => {
        return instanceToPlain(param, {
            excludeExtraneousValues: true,
        });
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        findByEmail: jest.fn().mockImplementation((userEmail: string) => {
                            if (userEmail === 'ServerError@test.com') return true;

                            return userEmail === 'seokho@test.com';
                        }),
                        deleteUserInfo: jest.fn().mockImplementation((userEmail: string) => {
                            if (userEmail === 'ServerError@test.com') return false;

                            return userEmail === 'seokho@test.com';
                        }),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('컨트롤러에 무의미 라우터', () => {
        it('GET /test', async () => {
            const test = await userController.test();
            expect(test).toEqual('무의미 라우터 테스트');
        });
    });

    describe('유저 정보 가져오기', () => {
        it('GET /getInfo', async () => {
            const sessionFailParam: Record<string, any> = {
                session: {
                    body: [],
                },
            };

            const nonUserParam: Record<string, any> = {
                passport: {
                    user: 'testtest@test.com',
                },
            };
            const sessionSuccessParam: Record<string, any> = {
                passport: {
                    user: 'seokho@test.com',
                },
            };

            const failResult = convertPlain(await userController.getUserInfo(sessionFailParam));

            const nonUserResult = convertPlain(await userController.getUserInfo(nonUserParam));

            const successResult = convertPlain(
                await userController.getUserInfo(sessionSuccessParam),
            );

            expect(failResult.status).toEqual('error');
            expect(failResult.message).toEqual('정보가 존재하지 않습니다.');
            expect(nonUserResult.status).toEqual('error');
            expect(nonUserResult.message).toEqual('로그인 하지 않았습니다.');
            expect(successResult.status).toEqual('success');
            expect(successResult.message).toEqual('');
        });
    });

    describe('유저 가입 정보 지우기', () => {
        it('POST /deleteUserInfo', async () => {
            const noSearchUserParam = new EmailDto('test@test.com');
            const successParam = new EmailDto('seokho@test.com');
            const serverErrorParam = new EmailDto('ServerError@test.com');
            const noSearchResult = convertPlain(
                await userController.deleteUserInfo(noSearchUserParam),
            );

            const successResult = convertPlain(await userController.deleteUserInfo(successParam));

            const serverErrorResult = convertPlain(
                await userController.deleteUserInfo(serverErrorParam),
            );

            expect(noSearchResult.status).toEqual('error');
            expect(noSearchResult.message).toEqual('존재하지 않는 유저입니다.');
            expect(successResult.status).toEqual('success');
            expect(serverErrorResult.status).toEqual('error');
            expect(serverErrorResult.message).toEqual('삭제에 실패했습니다.');
        });
    });

    describe('컨트롤러 exception', () => {
        it('getUserInfo', async () => {
            // jest.spyOn(userService, 'findByEmail').mockRejectedValue({
            //     test: 'test',
            //     err: 'err',
            // });
            const sessionSuccessParam: Record<string, any> = {
                passport: {
                    user: 'seokho@test.com',
                },
            };
            try {
                const failResult = convertPlain(
                    await userController.getUserInfo(sessionSuccessParam),
                );
            } catch (error) {
                console.log(error);
            }
            // console.log(failResult);
            // expect(failResult.status).toEqual('exception');
            // expect(failResult.message).toEqual('getUserInfo');
            // expect(Object.keys(failResult.data).length).toEqual(2);
        });
    });
});
