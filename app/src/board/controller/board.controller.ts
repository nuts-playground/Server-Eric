import {
    Controller,
    Get, InternalServerErrorException, Post,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { ApiTags } from '@nestjs/swagger';
import {BoardCategory} from "../entity/board-category.entity";
import {ResponseDto} from "../../common/dto/response.dto";
import {BoardContent} from "../entity/board-content.entity";
import {CreateBoardDto} from "../dto/create-board.dto";

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Get('/getBoardCategoryAll')
    async getBoardCategoryAll(): Promise<ResponseDto<BoardCategory[] | null>> {
        try {
            const categoryList = await this.boardService.getBoardCategoryAll();
            return ResponseDto.successData(categoryList);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Get('/getBoardLatestContentList')
    async getBoardLatestContentList(): Promise<ResponseDto<BoardContent[] | null>> {
        try {
            const contentList = await this.boardService.getBoardLatestContentList();
            return ResponseDto.successData(contentList);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/createBoardContent')
    async createBoardContent(createBoardDto: CreateBoardDto) {
        return await this.boardService.createBoardContent(createBoardDto);
    }
}
