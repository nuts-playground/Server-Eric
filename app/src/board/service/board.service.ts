import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {BoardCategoryRepository} from "../repository/board-category.repository";
import {BoardCategory} from "../entity/board-category.entity";

@Injectable()
export class BoardService {
    constructor(
        private readonly boardCategoryRepository: BoardCategoryRepository
    ) {}
    async getBoardCategoryAll() : Promise<BoardCategory[] | null> {
        try {
            return await this.boardCategoryRepository.find();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
