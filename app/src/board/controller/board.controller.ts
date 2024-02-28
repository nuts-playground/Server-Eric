import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Patch,
    Post,
} from '@nestjs/common';
import { DeleteBoardContentDto } from '../dto/board-content/delete-board-content.dto';
import { BoardService } from '../service/board.service';
import { ApiTags } from '@nestjs/swagger';
import { BoardCategory } from '../entity/board-category.entity';
import { ResponseDto } from '../../common/dto/response.dto';
import { BoardContent } from '../entity/board-content.entity';
import { CreateBoardContentDto } from '../dto/board-content/create-board-content.dto';

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
    async getBoardLatestContentList(): Promise<
        ResponseDto<BoardContent[] | null>
    > {
        try {
            const contentList =
                await this.boardService.getBoardLatestContentList();
            return ResponseDto.successData(contentList);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/createBoardContent')
    async createBoardContent(
        @Body() createBoardDto: CreateBoardContentDto,
    ): Promise<ResponseDto<any>> {
        try {
            console.log(createBoardDto);
            const state =
                await this.boardService.createBoardContent(createBoardDto);
            return state
                ? ResponseDto.success()
                : ResponseDto.error('게시글 등록에 실패하였습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Delete('/deleteBoardContent')
    async deleteBoardContent(
        deleteBoardContentDto: DeleteBoardContentDto,
    ): Promise<ResponseDto<any>> {
        try {
            const state = await this.boardService.deleteBoardContent(
                deleteBoardContentDto,
            );

            return state instanceof BoardContent
                ? ResponseDto.success()
                : ResponseDto.error('게시글 삭제에 실패하였습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    // @Patch('/updateBoardContent')
    // async updateBoardContent(): Promise<ResponseDto<any>> {
    //     try {
    //         const state = await this.boardService.updateBoardContent();
    //
    //         return state
    //             ? ResponseDto.success()
    //             : ResponseDto.error('게시글 수정에 실패하였습니다.');
    //     } catch (err) {
    //         throw new InternalServerErrorException(err);
    //     }
    // }
    //
    // @Post('/likeBoardContent')
    // async likeBoardContent() {
    //     try {
    //         const state = await this.boardService.likeBoardContent();
    //
    //         return state
    //             ? ResponseDto.success()
    //             : ResponseDto.error('좋아요 등록에 실패하였습니다.');
    //     } catch (err) {
    //         throw new InternalServerErrorException(err);
    //     }
    // }
    //
    // @Post('/commentBoardContent')
    // async commentBoardContent(): Promise<ResponseDto<any>> {
    //     try {
    //         const state = await this.boardService.commentBoardContent();
    //
    //         return state
    //             ? ResponseDto.success()
    //             : ResponseDto.error('댓글 등록에 실패하였습니다.');
    //     } catch (err) {
    //         throw new InternalServerErrorException(err);
    //     }
    // }
}
