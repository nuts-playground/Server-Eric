import { Repository } from 'typeorm';
import { BoardCategory } from '../../entity/board-category.entity';
import { mysqlConfig } from '../../../config/mysql.config';

export class TestBoardCategoryRepo extends Repository<BoardCategory> {
    private title = '자유게시판';

    constructor() {
        super(BoardCategory, mysqlConfig.getTestDataSource.createEntityManager());
    }

    getTestCategory() {
        return BoardCategory.from(this.title);
    }

    async setTestCategory(): Promise<BoardCategory> {
        return await this.save(this.getTestCategory());
    }

    async failSetTestCategory(): Promise<BoardCategory> {
        return await this.save(BoardCategory.from(''));
    }
}

export class TestMockBoardCategoryRepo {
    private testCategoryList = [
        { category_id: 1, title: '자유게시판' },
        { category_id: 2, title: '테스트 게시판' },
    ];

    async save() {
        return 'test';
    }

    async getCategoryList(): Promise<BoardCategory[]> {
        return this.testCategoryList.map((item) => {
            const testItem = new BoardCategory();
            testItem.category_id = item.category_id;
            testItem.title = item.title;
            return testItem;
        });
    }
    async find() {
        return this.testCategoryList;
    }

    getTestCategory(): BoardCategory {
        const testCategory = new BoardCategory();
        testCategory.category_id = 1;
        testCategory.title = '자유 테스트 게시판';
        return testCategory;
    }
}
