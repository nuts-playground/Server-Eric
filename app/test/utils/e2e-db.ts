import {mysqlConfig} from "../../src/config/mysql.config";

export class E2eDatabase {
    static async connect() {
        await mysqlConfig.testGetDataSource.initialize();
    }

    static async close() {
        await mysqlConfig.testGetDataSource.dropDatabase();
        await mysqlConfig.testGetDataSource.destroy();
    }
}