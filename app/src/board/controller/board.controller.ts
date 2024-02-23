import {
    Controller,
    Get, InternalServerErrorException,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { ApiTags } from '@nestjs/swagger';
import {BoardCategory} from "../entity/board-category.entity";
import {ResponseDto} from "../../common/dto/response.dto";

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
}
