import { DataSource, Repository } from 'typeorm';
import { DateUtil } from '../../../common/utils/date.util';
import { mysqlConfig } from '../../../config/mysql.config';
import { BoardContent } from '../../entity/board-content.entity';
import { TestUtil } from '../../../common/utils/test.util';

export class TestBoardContentRepo extends Repository<BoardContent> {
    constructor() {
        super(BoardContent, mysqlConfig.testGetDataSource.createEntityManager());
    }
}

export class TestMockBoardContentRepo {
    private time = TestUtil.getTimeEntity();
    private rowData: BoardContent = Object.assign(this.getTestContent(), { content_id: 1 });
    private savedContent = [this.rowData];

    private curData = [
        this.getTestContent('test title1', 'test content1', 1, 1),
        this.getTestContent('test title2', 'test content2', 2, 1),
        this.getTestContent('test title3', 'test content3', 3, 4),
        this.getTestContent('test title4', 'test content4', 4, 2),
        this.getTestContent('test title5', 'test content5', 5, 7),
        this.getTestContent('test title6', 'test content6', 6, 1),
        this.getTestContent('test title7', 'test content7', 7, 5),
        this.getTestContent('test title8', 'test content8', 8, 10),
        this.getTestContent('test title9', 'test content9', 9, 2),
        this.getTestContent('test title10', 'test content10', 10, 11),
    ];

    getTestcurData(count: number): BoardContent[] {
        return this.curData.slice(0, count);
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
        if (queryLength === 3 && contentId == 1 && categoryId == 1 && userId == 1) {
            return this.rowData;
        }

        if (queryLength === 2 && contentId == 1 && categoryId == 1) {
            return this.rowData;
        }

        if (queryLength === 1 && contentId == 1) {
            return this.rowData;
        }

        return false;
    }

    async find(obj: any) {
        if (obj) {
            return this.getTestcurData(obj.take);
        } else {
            return this.getTestcurData(10);
        }
    }

    async save(reqContent: BoardContent) {
        if (reqContent.content_id === 1) {
            this.savedContent[0].update_dtm = reqContent.update_dtm;
            this.savedContent[0].delete_dtm = reqContent.delete_dtm;
        } else {
            const newBoard = Object.assign(reqContent, this.time);
            this.savedContent.push(newBoard);
        }
        return this.savedContent[0];
    }

    async update(targetContentId: number, updateContent: any) {
        if (targetContentId === 1) {
            this.savedContent[0].title = updateContent.title;
            this.savedContent[0].content = updateContent.content;
            this.savedContent[0].update_dtm = DateUtil.dateNow();
        } else {
            return false;
        }

        return this.savedContent[0];
    }
}
