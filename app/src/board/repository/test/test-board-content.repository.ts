import { Repository } from 'typeorm';
import { DateUtil } from '../../../common/utils/date.util';
import { mysqlConfig } from '../../../config/mysql.config';
import { BoardContent } from '../../entity/board-content.entity';
import { TestUtil } from '../../../common/utils/test.util';

export class TestBoardContentRepo extends Repository<BoardContent> {
    constructor() {
        super(BoardContent, mysqlConfig.testGetDataSource.createEntityManager());
    }

    static getTestContent() {
        return BoardContent.from(1, 1, 'test 용 게시글 제목', 'test 용 게시글 이지롱');
    }
}

export class TestMockBoardContentRepo {
    private time = TestUtil.getTimeEntity();
    private rowData: BoardContent = Object.assign(this.getTestContent(), { content_id: 1 });
    private savedContent = [this.rowData];

    private curData = [
        this.getTestContent(1, 1, 'test title1', 'test content1'),
        this.getTestContent(1, 2, 'test title2', 'test content2'),
        this.getTestContent(1, 3, 'test title3', 'test content3'),
    ];

    getTestcurData(count: number): BoardContent[] {
        return this.curData.slice(0, count);
    }

    getTestContent(
        userId: number = 1,
        categoryId: number = 1,
        title: string = 'test title',
        content: string = 'test content',
    ): BoardContent {
        return Object.assign(BoardContent.from(userId, categoryId, title, content), this.time);
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
