import {Repository} from "typeorm";
import {mysqlConfig} from "../../../config/mysql.config";
import {BoardContent} from "../../entity/board-content.entity";

export class TestBoardContentRepo extends Repository<BoardContent> {
    constructor() {
        super(BoardContent, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockBoardContentRepo {
    title = 'mock repo'
}