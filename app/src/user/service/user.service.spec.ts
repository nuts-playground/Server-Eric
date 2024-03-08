import { Test, TestingModule } from '@nestjs/testing';
import { SignupDto } from '../dto/signup.dto';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { TestMockUserRepo } from '../repository/test/test-user.repository';
import { User } from '../entity/user.entity';

describe('[Service] 유저 서비스 테스트- user.service.ts', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useClass: TestMockUserRepo,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('내부: User 관련', () => {
        describe('[entity] User', () => {
            describe('[method] findByEmail', () => {
                it('찾으려는 유저가 있을 때 성공', async () => {
                    const testUserEmail = 'test1@google.com';
                    const user = (await userService.findByEmail(testUserEmail)) as User;
                    expect(user instanceof User).toBeTruthy();
                    expect(user.user_name).toEqual('testUser1');
                    expect(user.provider_id).toEqual('google');
                });

                it('찾으려는 유저가 없을 때 실패', async () => {
                    const testUserEmail = 'notFoundUser@test.com';
                    const user = await userService.findByEmail(testUserEmail);
                    expect(user instanceof User).toBeFalsy();
                });
            });

            describe('[method] signUp', () => {
                it('정상적인 정보로 요청 시 가입 성공', async () => {
                    const testUser = new SignupDto('test123@test.com', '테스트유저', 'google');

                    const user = (await userService.signUp(testUser)) as User;
                    expect(user instanceof User).toBeTruthy();
                    expect(user.create_dtm).not.toBeNull();
                    expect(user.update_dtm).toBeNull();
                    expect(user.delete_dtm).toBeNull();
                });

                it('비정상적인 정보로 요청 시 가입 불가', async () => {
                    const emailErrorUserReq = new SignupDto(
                        'testtest.com',
                        '실패테스트유저',
                        'google',
                    );
                    const nameErrorUserReq = new SignupDto(
                        'test123@test.com',
                        '20자리이상은 절대 안되는 이름이거등 안녕하세요 에러가 터질겁니다.',
                        'google',
                    );
                    const emailErrorUser = await userService.signUp(emailErrorUserReq);
                    expect(emailErrorUser).not.toBeInstanceOf(User);
                    expect((emailErrorUser as User).user_email).toEqual(
                        '올바른 이메일을 입력해주세요.',
                    );

                    const nameErrorUser = await userService.signUp(nameErrorUserReq);
                    expect(nameErrorUser).not.toBeInstanceOf(User);
                    expect((nameErrorUser as User).user_name).toEqual(
                        '이름은 최소 2글자 이상 20자 이하로 입력해주세요.',
                    );
                });
            });

            describe('[method] delete', () => {
                it('지우려는 유저가 있을 때 성공', async () => {
                    const testUserEmail = 'test123@test.com';
                    const deleteUser = await userService.delete(testUserEmail);
                    expect(deleteUser).toEqual(true);
                });

                it('지유려는 유저가 없을 때 실패', async () => {
                    const testUserEmail = 'notFoundUser@test.com';
                    const deleteUser = await userService.delete(testUserEmail);
                    expect(deleteUser).toEqual(false);
                });
            });
        });
    });
});
