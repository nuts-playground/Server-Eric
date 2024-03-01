import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {mysqlConfig} from "../../config/mysql.config";
import {SignupDto} from "../dto/signup.dto";
import {ProviderIdEnum} from "../enum/provider-id-enum";

export class TestUserRepository extends Repository<User> {
    testUserEmail = 'test123@naver.com';
    testUserName = '테스트유저';
    testProvider: ProviderIdEnum = 'google'

    constructor() {
        super(User, mysqlConfig.getTestDataSource.createEntityManager());
    }

    getTestUser() {
        return new SignupDto(
            this.testUserEmail,
            this.testUserName,
            this.testProvider
        ).toEntity();
    }
}