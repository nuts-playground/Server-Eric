import { Repository } from 'typeorm';
import { mysqlConfig } from '../../../config/mysql.config';
import { BoardContent } from '../../entity/board-content.entity';
import { TestUtil } from '../../../common/utils/test.util';
import { query } from 'express';

export class TestBoardContentRepo extends Repository<BoardContent> {
    constructor() {
        super(BoardContent, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockBoardContentRepo {
    category_id = 1;
    content_id = 1;
    user_id = 1;
    content = 'test content';
    title = 'test title';

    getTestContent(): BoardContent {
        let testContent = new BoardContent();
        testContent.category_id = this.category_id;
        testContent.content_id = this.content_id;
        testContent.user_id = this.user_id;
        testContent.content = this.content;
        testContent.title = this.title;
        const time = TestUtil.getTimeEntity();
        return Object.assign(testContent, time);
    }

    async findOne(query: any): Promise<BoardContent | boolean> {
        const queryLength = Object.values(query.where).length;
        const [contentId, categoryId, userId] = Object.values(query.where);
        const testContent: BoardContent = this.getTestContent();

        if (queryLength === 3 && contentId == 1 && categoryId == 1 && userId == 1) {
            return testContent;
        }

        if (queryLength === 2 && contentId == 1 && categoryId == 1) {
            return testContent;
        }

        if (queryLength === 1 && contentId == 1) {
            return testContent;
        }

        return false;
    }
}
