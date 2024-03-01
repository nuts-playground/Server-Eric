import {Repository} from "typeorm";
import {BoardCategory} from "../entity/board-category.entity";
import {mysqlConfig} from "../../config/mysql.config";

export class TestBoardCategoryRepository extends Repository<BoardCategory> {
    title = '자유게시판'

    constructor() {
        super(BoardCategory, mysqlConfig.getTestDataSource.createEntityManager());
    }

    getTestCategory() {
        return BoardCategory.from(this.title);
    }
}