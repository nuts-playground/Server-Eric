import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../entity/user.entity';
import { mysqlConfig } from '../../../config/mysql.config';
import { ProviderIdEnum } from '../../enum/provider-id-enum';
import { DateUtil } from '../../../common/utils/date.util';
import { TestUtil } from '../../../common/utils/test.util';
import { SignupDto } from '../../dto/signup.dto';

export class TestUserRepo extends Repository<User> {
    testUserEmail = 'test123@naver.com';
    testUserName = '테스트유저';
    testProvider: ProviderIdEnum = 'google';

    constructor() {
        super(User, mysqlConfig.getTestDataSource.createEntityManager());
    }

    getTestUser() {
        return User.from(this.testUserEmail, this.testUserName, this.testProvider);
    }

    async setTestUser(): Promise<User> {
        return await this.save(this.getTestUser());
    }
}

export class TestMockUserRepo {
    testUserEmail = 'test123@test.com';
    testUserName = '테스트유저';
    testProvider: ProviderIdEnum = 'google';
    testTime = TestUtil.getTimeEntity();

    getTestUser() {
        const user = User.from(this.testUserEmail, this.testUserName, this.testProvider);

        return Object.assign(user, this.testTime);
    }

    async findOne(query: any): Promise<User | boolean> {
        if (query.where.user_email === this.testUserEmail) {
            return this.getTestUser();
        } else {
            return false;
        }
    }

    async save(reqUser: User): Promise<User | boolean> {
        console.log(reqUser);
        if (reqUser instanceof User) {
            const saveUser = new User();
            saveUser.user_id = 1;
            saveUser.user_email = reqUser.user_email;
            saveUser.provider_id = reqUser.provider_id;

            return Object.assign(saveUser, this.testTime);
        } else {
            return false;
        }
    }

    async softDelete(query: any) {
        // 반환값 임시로 boolean 으로 실제는 다름
        return query.user_email === this.testUserEmail;
    }
}
