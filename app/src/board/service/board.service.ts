import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {BoardCategoryRepository} from "../repository/board-category.repository";
import {BoardCategory} from "../entity/board-category.entity";
import {BoardContentRepository} from "../repository/board-content.repository";
import {BoardContent} from "../entity/board-content.entity";
import {CreateBoardDto} from "../dto/create-board.dto";

@Injectable()
export class BoardService {
    constructor(
        private readonly boardCategoryRepository: BoardCategoryRepository,
        private readonly boardContentRepository: BoardContentRepository
    ) {}
    async getBoardCategoryAll() : Promise<BoardCategory[] | null> {
        try {
            return await this.boardCategoryRepository.find();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async getBoardLatestContentList(): Promise<BoardContent[] | null> {
        try {
            return await this.boardContentRepository.find({
                take: 10
            });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async createBoardContent(createBoardDto: CreateBoardDto) {
        try {
            return await this.boardContentRepository.save(createBoardDto.toEntity());
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

}
