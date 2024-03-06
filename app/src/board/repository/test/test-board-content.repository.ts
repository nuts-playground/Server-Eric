import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { mysqlConfig } from '../../../config/mysql.config';
import { BoardContent } from '../../entity/board-content.entity';
import { TestUtil } from '../../../common/utils/test.util';

export class TestBoardContentRepo extends Repository<BoardContent> {
    constructor() {
        super(BoardContent, mysqlConfig.getTestDataSource.createEntityManager());
    }
}

export class TestMockBoardContentRepo {
    private time = TestUtil.getTimeEntity();
    private savedContent = [
        Object.assign(
            {
                category_id: 1,
                content_id: 1,
                user_id: 1,
                title: 'test title',
                content: 'test content',
            },
            this.time,
        ),
    ];

    private contentList = [
        this.getTestContent('test title1', 'test content1'),
        this.getTestContent('test title2', 'test content2'),
        this.getTestContent('test title3', 'test content3'),
        this.getTestContent('test title4', 'test content4'),
        this.getTestContent('test title5', 'test content5'),
        this.getTestContent('test title6', 'test content6'),
        this.getTestContent('test title7', 'test content7'),
        this.getTestContent('test title8', 'test content8'),
        this.getTestContent('test title9', 'test content9'),
        this.getTestContent('test title10', 'test content10'),
    ];

    getTestContentList(count: number): BoardContent[] {
        return this.contentList.slice(0, count);
    }

    getTestContent(
        title: string = 'test title',
        content: string = 'test content',
        categoryId: number = 1,
        userId: number = 1,
    ): BoardContent {
        return Object.assign(BoardContent.from(title, content, categoryId, userId), this.time);
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

    async find(obj: any) {
        if (obj) {
            return this.getTestContentList(obj.take);
        } else {
            return this.getTestContentList(10);
        }
    }

    async save(reqContent: BoardContent) {
        const newBoard = Object.assign(reqContent, this.time);
        this.savedContent.push(newBoard);
        return newBoard;
    }
}
