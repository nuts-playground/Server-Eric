import { Repository } from 'typeorm';
import { BoardComment } from '../../entity/board-comment.entity';
import { mysqlConfig } from '../../../config/mysql.config';

export class TestBoardCommentRepo extends Repository<BoardComment> {
    constructor() {
        super(BoardComment, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockBoardCommentRepo {
    title = 'mock repo';
}
