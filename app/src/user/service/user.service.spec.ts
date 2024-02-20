import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
    let service;
    let userRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [User],
            providers: [UserService, UserRepository],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should find a user by email', async () => {
        console.log(service);
    });
});
