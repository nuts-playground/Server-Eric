import {Repository} from "typeorm";
import {User} from "../../entity/user.entity";
import {mysqlConfig} from "../../../config/mysql.config";
import {ProviderIdEnum} from "../../enum/provider-id-enum";

export class TestUserRepo extends Repository<User> {
    testUserEmail = 'test123@naver.com';
    testUserName = '테스트유저';
    testProvider: ProviderIdEnum = 'google'

    constructor() {
        super(User, mysqlConfig.getTestDataSource.createEntityManager());
    }

    getTestUser() {
        return User.from(
            this.testUserEmail,
            this.testUserName,
            this.testProvider
        );
    }

    async setTestUser(): Promise<User> {
        return await this.save(this.getTestUser());
    }
}

export class TestMockUserRepo {
    title = 'mock repo';
}