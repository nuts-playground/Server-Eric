import { DataSource, Repository } from 'typeorm';
import { mysqlConfig } from '../../src/config/mysql.config';
import { BoardCategory } from '../../src/board/entity/board-category.entity';

export class TestBoardCategoryRepository extends Repository<BoardCategory> {
    constructor(private dataSource: DataSource) {
        super(BoardCategory, mysqlConfig.getTestDataSource.createEntityManager());
    }
}
