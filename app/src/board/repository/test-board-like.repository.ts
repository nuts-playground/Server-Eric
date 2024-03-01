import {Repository} from "typeorm";
import {mysqlConfig} from "../../config/mysql.config";
import {BoardLike} from "../entity/board-like.entity";

export class TestBoardLikeRepository extends Repository<BoardLike> {
    constructor() {
        super(BoardLike, mysqlConfig.getTestDataSource.createEntityManager());
    }
}