import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfig } from './env.config';

class MysqlConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }
    // mysql 디비 커넥에 필요한 객체 반환
    public getConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.getValue('MYSQL_HOST'),
            port: parseInt(this.getValue('MYSQL_PORT')),
            username: this.getValue('MYSQL_USERNAME'),
            password: this.getValue('MYSQL_PASSWORD'),
            database: this.getValue('MYSQL_NAME'),
            synchronize: false,
            entities: [__dirname + '/..' + '/**/*.entity{.ts,.js}'],
            timezone: 'UTC',
        };
    }
}

export const mysqlConfig = new MysqlConfig(process.env).verifyKey(['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USERNAME', 'MYSQL_PASSWORD', 'MYSQL_NAME']);
