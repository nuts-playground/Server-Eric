import { DataSource, Repository } from 'typeorm';
import { mysqlConfig } from '../../src/config/mysql.config';
import { User } from '../../src/user/entity/user.entity';

export class TestUserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, mysqlConfig.getTestDataSource.createEntityManager());
    }
}
