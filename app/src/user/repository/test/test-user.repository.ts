import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { mysqlConfig } from '../../../config/mysql.config';
import { ProviderIdEnum } from '../../enum/provider-id-enum';
import { TestUtil } from '../../../common/utils/test.util';

export class TestUserRepo extends Repository<User> {
    constructor() {
        super(User, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockUserRepo {
    private savedUserEmail = 'test1@google.com';
    private testTime = TestUtil.getTimeEntity();
    private userList: User[] = [
        this.getTestUser('test1@google.com', 'testUser1', 'google'),
        this.getTestUser('test2@github.com', 'testUser2', 'github'),
        this.getTestUser('test3@naver.com', 'testUser3', 'naver'),
        this.getTestUser('test4@kakao.com', 'testUser4', 'kakao'),
    ];

    getTestUser(
        email: string = 'test1@google.com',
        name: string = 'testUser1',
        providerId: ProviderIdEnum = 'google',
    ) {
        return Object.assign(User.from(email, name, providerId), this.testTime);
    }

    async findOne(query: any): Promise<User | boolean> {
        if (query.where.user_email === this.savedUserEmail) {
            return this.getTestUser();
        } else {
            return false;
        }
    }

    async save(reqUser: User): Promise<User | boolean> {
        console.log(reqUser);
        if (reqUser instanceof User) {
            return this.getTestUser();
        } else {
            return false;
        }
    }

    async softDelete(query: any) {
        // 반환값 임시로 boolean 으로 실제는 다름
        return query.user_email === this.savedUserEmail;
    }
}
