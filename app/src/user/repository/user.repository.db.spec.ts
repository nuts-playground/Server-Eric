import { Repository } from 'typeorm';
import { mysqlConfig } from '../../config/mysql.config';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../entity/user.entity';

describe('typeorm version test', () => {
    let userRepository; // custom repository
    let testInfo; // test 용 user info
    let testUser; // test 용 회원가입 dto
    let checkUserKeys; // 이건 그냥 db에 들어간 key 모음
    let action; // 요거는 분기처리 좀 더 편하게 하기 위한 모의 함수

    beforeAll(async () => {
        await mysqlConfig.getTestDataSource.initialize();
    });

    beforeEach(() => {
        userRepository = new Repository<User>(
            User,
            mysqlConfig.getTestDataSource.createEntityManager(),
        );
        testInfo = {
            userEmail: 'test123@test.com',
            userName: 'test',
            providerId: 'kakao',
        };

        testUser = new SignupDto(
            testInfo.userEmail,
            testInfo.userName,
            testInfo.providerId,
        ).toEntity();

        checkUserKeys = [
            'user_id',
            'user_email',
            'user_name',
            'provider_id',
            'update_dtm',
            'delete_dtm',
            'create_dtm',
        ];

        action = async (actionTrigger: any, func: () => void) => {
            if (actionTrigger instanceof User) {
                func();
            } else {
                console.log(actionTrigger);
            }
        };
    });

    it('save test', async () => {
        async function saveTest() {
            const saveUser = await userRepository.save(testUser);
            expect(saveUser).not.toBeNull();
            expect(Object.keys(saveUser).sort()).toEqual(checkUserKeys.sort());
            expect(saveUser.user_email).toEqual(testInfo.userEmail);
            expect(saveUser.user_name).toEqual(testInfo.userName);
            expect(saveUser.provider_id).toEqual(testInfo.providerId);
            expect(saveUser).toBeInstanceOf(User);
        }
        await action(testUser, saveTest);
    });

    it('find test', async () => {
        async function findTest() {
            await userRepository.save(testUser);

            const findUser = await userRepository.findOne({
                where: { user_email: testInfo.userEmail },
            });
            expect(findUser).not.toBeNull();
            expect(Object.keys(findUser)).toHaveLength(checkUserKeys.length);
            expect(findUser).toBeInstanceOf(User);
        }
        await action(testUser, findTest);
    });

    it('update test', async () => {
        async function updateTest() {
            await userRepository.save(testUser);
            const findUser = await userRepository.findOne({
                where: { user_email: testInfo.userEmail },
            });

            await userRepository.update(findUser.user_id, {
                provider_id: 'kakao',
            });

            const afterFindUser = await userRepository.findOne({
                where: { user_email: testInfo.userEmail },
            });

            expect(afterFindUser).not.toBeNull();
            expect(afterFindUser).toBeInstanceOf(User);
            expect(afterFindUser.provider_id).toEqual('kakao');
        }
        await action(testUser, updateTest);
    });

    it('delete test', async () => {
        async function deleteTest() {
            await userRepository.save(testUser);
            const deleteUser = await userRepository.delete({
                user_email: testInfo.userEmail,
            });
            const afterFindUser = await userRepository.findOne({
                where: { user_email: testInfo.userEmail },
            });
            expect(deleteUser).not.toBeNull();
            expect(afterFindUser).toBeNull();
        }
        await action(testUser, deleteTest);
    });

    afterAll(async () => {
        await mysqlConfig.getTestDataSource.dropDatabase();
    });
});
