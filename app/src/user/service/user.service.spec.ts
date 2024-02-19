// import { createMock } from '@golevelup/ts-jest';
// import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '../entity/user.entity';
// import { UserRepository } from '../repository/user.repository';
// import { UserService } from './user.service';
//
// describe('UserService', () => {
//     let service: UserService;
//     let userRepository: UserRepository;
//
//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 UserService,
//                 { provide: UserRepository, useFactory: () => createMock() },
//             ],
//         }).compile();
//
//         service = module.get<UserService>(UserService);
//         userRepository = module.get<UserRepository>(UserRepository);
//     });
//
//     it('should find a user by email', async () => {
//         const mockUser = new User();
//         mockUser.user_email = 'test@example.com';
//
//         const userRepositoryMock = jest.fn();
//         userRepositoryMock.mockImplementation(() => {
//             return {
//                 findOne: jest.fn().mockResolvedValueOnce(mockUser),
//             };
//         });
//
//         const service = new UserService(userRepositoryMock);
//         const result = await service.findByEmail('test@example.com');
//
//         expect(result).toBe(mockUser);
//     });
// });
