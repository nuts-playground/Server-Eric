import {Repository} from "typeorm";
import {BoardCategory} from "../../entity/board-category.entity";
import {mysqlConfig} from "../../../config/mysql.config";
import {BoardContent} from "../../entity/board-content.entity";

export class TestBoardCategoryRepo extends Repository<BoardCategory> {
    title = '자유게시판'

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
    title = 'mock repo';
    save(): string {
        return 'test'
    }
}