import { Repository } from 'typeorm';
import { mysqlConfig } from '../../config/mysql.config';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { User } from '../entity/user.entity';
import { ProviderIdEnum } from '../enum/provider-id-enum';

describe('typeorm version test', () => {
    const userRepository = new Repository<User>(
        User,
        mysqlConfig.getTestDataSource.createEntityManager(),
    );
    const testInfo = {
        userEmail: 'test123@test.com',
        userName: 'test',
        providerId: 'naver',
    };
    const testUser = new UserSignUpDto(
        testInfo.userEmail,
        testInfo.userName,
        testInfo.providerId as ProviderIdEnum,
    ).toEntity();

    beforeAll(async () => {
        await mysqlConfig.getTestDataSource.initialize();
    });

    beforeEach(async () => {
        console.log('beforeEach');
    });

    it('test', async () => {
        await userRepository.save(testUser);
        console.log(
            await userRepository.findOne({
                where: { user_email: testInfo.userEmail },
            }),
        );
    });

    afterAll(async () => {
        await mysqlConfig.getTestDataSource.dropDatabase();
    });
});
