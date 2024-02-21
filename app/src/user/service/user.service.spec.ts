import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { ProviderIdEnum } from '../enum/provider-id-enum';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

const testUserEmail = 'test123@test.com';

const testInfo = {
    userEmail: 'test123@test.com',
    userName: 'test',
    providerId: 'google',
};

const testUser = new UserSignUpDto(
    testInfo.userEmail,
    testInfo.userName,
    testInfo.providerId as ProviderIdEnum,
).toEntity();

const notFoundEmail = 'testNotFound@naver.com';

describe('user service test', () => {
    let userRepository;
    let userService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                UserRepository,
                {
                    provide: DataSource,
                    useValue: {
                        createEntityManager: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('findByEmail test', () => {
        it('find success user', async () => {
            const repoSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(testUser);
            const user = await userService.findByEmail(testUserEmail);
            expect(user).toEqual(testUser);
            expect(repoSpy).toBeCalledWith({
                where: { user_email: testUserEmail },
            });
        });

        it('find fail user', async () => {
            const repoSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockImplementation((userEmail: string) => {
                    return userEmail === testUserEmail ? testUser : null;
                });

            const user = await userService.findByEmail(notFoundEmail);
            expect(user).toBeFalsy();
            expect(repoSpy).toBeCalledWith({
                where: { user_email: notFoundEmail },
            });
        });
    });

    describe('delete test', () => {
        it('soft delete user', async () => {
            const repoSpy = jest
                .spyOn(userRepository, 'softDelete')
                .mockResolvedValue(true);
            const deleteUser = await userService.delete(testUserEmail);
            expect(deleteUser).toEqual(true);
            expect(repoSpy).toBeCalledWith({ user_email: testUserEmail });
        });

        it('soft delete not found user', async () => {
            const repoSpy = jest
                .spyOn(userRepository, 'softDelete')
                .mockImplementation((userEmail: string) => {
                    return userEmail === testUserEmail;
                });
            const deleteUser = await userService.delete(notFoundEmail);
            expect(deleteUser).toEqual(false);
            expect(repoSpy).toBeCalledWith({ user_email: notFoundEmail });
        });
    });
});
