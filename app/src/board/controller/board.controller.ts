import { Body, Controller, Delete, Get, Post, InternalServerErrorException } from '@nestjs/common';
import { DeleteContentDto } from '../dto/content/delete-content.dto';
import { BoardService } from '../service/board.service';
import { ApiTags } from '@nestjs/swagger';
import { BoardCategory } from '../entity/board-category.entity';
import { ResponseDto } from '../../common/dto/response.dto';
import { BoardContent } from '../entity/board-content.entity';
import { CreateContentDto } from '../dto/content/create-content.dto';

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Get('/categoryList')
    async getCategoryList(): Promise<ResponseDto<BoardCategory[] | null>> {
        try {
            const categoryList = await this.boardService.getCategoryList();
            return ResponseDto.successData(categoryList);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Get('/latestContentList')
    async getLatestContentList(): Promise<ResponseDto<BoardContent[] | null>> {
        try {
            const contentList = await this.boardService.getLatestContentList();
            return ResponseDto.successData(contentList);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/content')
    async createContent(
        @Body() createContentDto: CreateContentDto,
    ): Promise<ResponseDto<string | null>> {
        try {
            const state = await this.boardService.createContent(createContentDto);
            return state
                ? ResponseDto.success()
                : ResponseDto.error('게시글 등록에 실패하였습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Delete('/content')
    async deleteContent(deleteContentDto: DeleteContentDto): Promise<ResponseDto<string | null>> {
        try {
            const state = await this.boardService.deleteContent(deleteContentDto);

            return state instanceof BoardContent
                ? ResponseDto.success()
                : ResponseDto.error('게시글 삭제에 실패하였습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    // @Patch('/content')
    // async updateContent(updateContentDto: UpdateContentDto): Promise<ResponseDto<string | null>> {
    //     try {
    //         const state = await this.boardService.updateContent(updateContentDto);
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
