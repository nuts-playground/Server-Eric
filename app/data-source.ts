import { config } from 'dotenv';
config({
    path:
        process.env.NODE_ENV === 'production'
            ? __dirname + '/.production.env'
            : __dirname + '/.dev.env',
});
console.log(__dirname + '/.production.env');
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT, // Number
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
    entities: ['dist/**/**/*.entity.js'],
    synchronize: false,
    timezone: 'Z',
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
});
