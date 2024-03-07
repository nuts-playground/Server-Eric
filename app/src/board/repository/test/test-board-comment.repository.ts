import { Repository } from 'typeorm';
import { TestUtil } from '../../../common/utils/test.util';
import { BoardComment } from '../../entity/board-comment.entity';
import { mysqlConfig } from '../../../config/mysql.config';

export class TestBoardCommentRepo extends Repository<BoardComment> {
    constructor() {
        super(BoardComment, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockBoardCommentRepo {
    private curData = [
        this.getTestComment(1, 1, 'test comment 1'),
        this.getTestComment(2, 1, 'test comment 2'),
        this.getTestComment(3, 1, 'test comment 3'),
        this.getTestComment(4, 4, 'test comment 4'),
    ];

    getTestComment(id, userId, comment): BoardComment {
        const testComment = new BoardComment();
        testComment.content_id = id;
        testComment.user_id = userId;
        testComment.comment = comment;
        return Object.assign(testComment, TestUtil.getTimeEntity());
    }

    find(query) {
        return this.curData.filter((item) => item.content_id === query.where.content_id);
    }

    save(boardComment: BoardComment) {
        if ([1, 2, 3, 4].includes(boardComment.content_id)) {
            this.curData.push(boardComment);
            return this.curData[this.curData.length - 1];
        } else {
            return null;
        }
    }
}
