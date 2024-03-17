import { Repository } from 'typeorm';
import { DateUtil } from '../../../common/utils/date.util';
import { TestUtil } from '../../../common/utils/test.util';
import { mysqlConfig } from '../../../config/mysql.config';
import { BoardComment } from '../../entity/board-comment.entity';

export class TestBoardCommentRepo extends Repository<BoardComment> {
    constructor() {
        super(BoardComment, mysqlConfig.testGetDataSource.createEntityManager());
    }
    static getTestComment() {
        return BoardComment.from(1, 1, 'test comment');
    }
}

export class TestMockBoardCommentRepo {
    private curData = [
        this.getTestComment(1, 1, 1, 'test comment 1'),
        this.getTestComment(2, 1, 1, 'test comment 2'),
        this.getTestComment(3, 1, 1, 'test comment 3'),
        this.getTestComment(4, 1, 4, 'test comment 4'),
    ];

    getTestComment(id, contentId, userId, comment): BoardComment {
        const testComment = new BoardComment();
        testComment.comment_id = contentId;
        testComment.content_id = id;
        testComment.user_id = userId;
        testComment.comment = comment;
        return Object.assign(testComment, TestUtil.getTimeEntity());
    }

    find(query) {
        return this.curData.filter((item) => item.content_id === query.where.content_id);
    }

    findOne(query) {
        const queryLength = Object.values(query.where).length;
        const [commentId, contentId, userId] = Object.values(query.where);
        if (queryLength === 3 && commentId == 1 && contentId == 1 && userId == 1) {
            return this.curData[0];
        }

        if (queryLength === 2 && commentId == 1 && contentId == 1) {
            return this.curData[0];
        }

        if (queryLength === 1 && commentId == 1) {
            return this.curData[0];
        }

        return false;
    }

    save(boardComment: BoardComment) {
        if ([1, 2, 3, 4].includes(boardComment.content_id)) {
            this.curData.push(boardComment);
            return this.curData[this.curData.length - 1];
        } else {
            return null;
        }
    }

    async update(targetCommentId: number, updateComment: any) {
        if (targetCommentId === 1) {
            const curDate = DateUtil.dateNow();
            this.curData[0].comment = updateComment.comment;
            this.curData[0].update_dtm = curDate;
        } else {
            return false;
        }

        return this.curData[0];
    }
}
