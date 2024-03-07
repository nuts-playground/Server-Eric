import { Body, Controller, Delete, Get, Post, Patch } from '@nestjs/common';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { DeleteCommentDto } from '../dto/comment/delete-comment.dto';
import { GetCommentListDto } from '../dto/comment/get-comment-list.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { DeleteContentDto } from '../dto/content/delete-content.dto';
import { BoardService } from '../service/board.service';
import { ApiTags } from '@nestjs/swagger';
import { BoardCategory } from '../entity/board-category.entity';
import { ResponseDto } from '../../common/dto/response.dto';
import { BoardContent } from '../entity/board-content.entity';
import { CreateContentDto } from '../dto/content/create-content.dto';
import { UpdateContentDto } from '../dto/content/update-content.dto';

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Get('/categoryList')
    async getCategoryList(): Promise<ResponseDto<BoardCategory[] | null>> {
        const categoryList = await this.boardService.getCategoryList();
        return ResponseDto.successData(categoryList);
    }

    @Get('/latestContentList')
    async getLatestContentList(): Promise<ResponseDto<BoardContent[] | null>> {
        const contentList = await this.boardService.getLatestContentList();
        return ResponseDto.successData(contentList);
    }

    @Post('/content')
    async createContent(
        @Body() createContentDto: CreateContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.createContent(createContentDto);
        return state ? ResponseDto.success() : ResponseDto.error('게시글 등록에 실패하였습니다.');
    }

    @Delete('/content')
    async deleteContent(
        @Body() deleteContentDto: DeleteContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.deleteContent(deleteContentDto);
        return state instanceof BoardContent
            ? ResponseDto.success()
            : ResponseDto.error('게시글 삭제에 실패하였습니다.');
    }

    @Patch('/content')
    async updateContent(
        @Body() updateContentDto: UpdateContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.updateContent(updateContentDto);
        return state ? ResponseDto.success() : ResponseDto.error('게시글 수정에 실패하였습니다.');
    }

    @Get('/commentList')
    async getCommentList(@Body() getCommentListDto: GetCommentListDto) {
        const commentList = await this.boardService.getCommentList(
            getCommentListDto.getContentId(),
        );
        return ResponseDto.successData(commentList);
    }

    @Post('/comment')
    async createComment(@Body() createCommentDto: CreateCommentDto): Promise<ResponseDto<any>> {
        const state = await this.boardService.createComment(createCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 등록에 실패하였습니다.');
    }

    @Patch('/comment')
    async updateComment(@Body() updateCommentDto: UpdateCommentDto) {
        const state = await this.boardService.updateComment(updateCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 수정에 실패하였습니다.');
    }

    @Delete('/comment')
    async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
        const state = await this.boardService.deleteComment(deleteCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 삭제에 실패하였습니다.');
    }
}
