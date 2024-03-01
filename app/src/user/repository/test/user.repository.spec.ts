import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, UpdateResult } from 'typeorm';
import { SignupDto } from '../../dto/signup.dto';
import { User } from '../../entity/user.entity';
import { ProviderIdEnum } from '../../enum/provider-id-enum';
import { UserRepository } from '../user.repository';

describe('UserRepository CRUD Test', () => {
    let imsiUserTable: User[];
    let userRepository: UserRepository;

    const testInfo = {
        userEmail: 'test123@test.com',
        userName: 'test',
        providerId: 'google',
    };
    const testUser = new SignupDto(
        testInfo.userEmail,
        testInfo.userName,
        testInfo.providerId as ProviderIdEnum,
    ).toEntity() as User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: DataSource,
                    useValue: { createEntityManager: jest.fn() },
                },
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        imsiUserTable = [];
        jest.spyOn(userRepository, 'save').mockResolvedValue(testUser);

        jest.spyOn(userRepository, 'findOne').mockImplementation(async (userEmailObj) => {
            const userEmail = userEmailObj.where['user_email'];
            for (let i = 0; i < imsiUserTable.length; i++) {
                const curUser = imsiUserTable[i];
                if (curUser.user_email === userEmail) {
                    return curUser as User;
                }
            }
        });

        jest.spyOn(userRepository, 'softDelete').mockImplementation(async (userEmail: string) => {
            for (let i = 0; i < imsiUserTable.length; i++) {
                const curUser = imsiUserTable[i];
                if (curUser.user_email === userEmail) {
                    imsiUserTable[i] = {
                        ...imsiUserTable[i],
                        delete_dtm: new Date(),
                    };
                    return { raw: true } as UpdateResult;
                }
            }
        });
    });

    it('save test', async () => {
        const saveUser = await userRepository.save(testUser);
        expect(saveUser).toEqual(testUser);
    });

    it('findOne test', async () => {
        imsiUserTable.push(testUser);
        const findOneUser = await userRepository.findOne({
            where: { user_email: testInfo.userEmail },
        });
        expect(findOneUser).toEqual(testUser);
    });

    it('update test', async () => {
        imsiUserTable.push(testUser);
        const findOneUser = await userRepository.findOne({
            where: { user_email: testInfo.userEmail },
        });
        if (findOneUser) {
            const updateUser = new SignupDto(
                testInfo.userEmail,
                testInfo.userName,
                'naver' as ProviderIdEnum,
            ).toEntity() as User;

            const targetUser = await userRepository.save(updateUser);
            const resultArr = [];
            for (let i = 0; i < imsiUserTable.length; i++) {
                const curUser = imsiUserTable[i];
                if (curUser.user_email === targetUser.user_email) {
                    imsiUserTable[i] = updateUser;
                    resultArr.push(imsiUserTable[i]);
                    break;
                }
            }
            expect(imsiUserTable[0]).toEqual(resultArr[0]);
        }
    });

    it('delete test', async () => {
        imsiUserTable.push(testUser);
        const findOneUser = await userRepository.findOne({
            where: { user_email: testInfo.userEmail },
        });

        await userRepository.softDelete(findOneUser.user_email);
        expect(imsiUserTable[0]).toHaveProperty('delete_dtm');
    });
});
