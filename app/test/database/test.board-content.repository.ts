import { DataSource, Repository } from 'typeorm';
import { mysqlConfig } from '../../src/config/mysql.config';
import {BoardContent} from "../../src/board/entity/board-content.entity";

export class TestBoardContentRepository extends Repository<BoardContent> {
    constructor(private dataSource: DataSource) {
        super(BoardContent, mysqlConfig.getTestDataSource.createEntityManager());
    }
}
