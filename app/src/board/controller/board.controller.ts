import { Body, Controller, Delete, Get, Post, Patch } from '@nestjs/common';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { DeleteCommentDto } from '../dto/comment/delete-comment.dto';
import { GetCommentListDto } from '../dto/comment/get-comment-list.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { DeleteContentDto } from '../dto/content/delete-content.dto';
import { BoardService } from '../service/board.service';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { BoardCategory } from '../entity/board-category.entity';
import { ResponseDto } from '../../common/dto/response.dto';
import { BoardContent } from '../entity/board-content.entity';
import { CreateContentDto } from '../dto/content/create-content.dto';
import { UpdateContentDto } from '../dto/content/update-content.dto';

@Controller('board')
@ApiTags('게시판 API')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    /*
     *
     * 현재 생성되어 있는 게시판 목록 조회
     *
     * */
    @Get('/categoryList')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async getCategoryList(): Promise<ResponseDto<BoardCategory[] | null>> {
        const categoryList = await this.boardService.getCategoryList();
        return ResponseDto.successData(categoryList);
    }

    /*
     *
     * 현재 등록 되어 있는 최근 게시글 50개 까지 조회
     *
     * */
    @Get('/latestContentList')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async getLatestContentList(): Promise<ResponseDto<BoardContent[] | null>> {
        const contentList = await this.boardService.getLatestContentList();
        return ResponseDto.successData(contentList);
    }

    /*
     *
     * 새로운 게시글 작성
     *
     * */
    @Post('/content')
    @ApiCreatedResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async createContent(
        @Body() createContentDto: CreateContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.createContent(createContentDto);
        return state ? ResponseDto.success() : ResponseDto.error('게시글 등록에 실패하였습니다.');
    }

    /*
     *
     * 현재 등록 되어 있는 게시글 삭제
     *
     * */
    @Delete('/content')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async deleteContent(
        @Body() deleteContentDto: DeleteContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.deleteContent(deleteContentDto);
        return state instanceof BoardContent
            ? ResponseDto.success()
            : ResponseDto.error('게시글 삭제에 실패하였습니다.');
    }
    /*
     *
     * 현재 등록 되어 있는 게시글 업데이트
     *
     * */
    @Patch('/content')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async updateContent(
        @Body() updateContentDto: UpdateContentDto,
    ): Promise<ResponseDto<string | null>> {
        const state = await this.boardService.updateContent(updateContentDto);
        return state ? ResponseDto.success() : ResponseDto.error('게시글 수정에 실패하였습니다.');
    }

    /*
     *
     * 게시글에 현재 생성되어 있는 댓글 목록 조회
     *
     * */
    @Post('/commentList')
    @ApiCreatedResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async getCommentList(@Body() getCommentListDto: GetCommentListDto) {
        const commentList = await this.boardService.getCommentList(
            getCommentListDto.getContentId(),
        );
        return ResponseDto.successData(commentList);
    }

    /*
     *
     * 게시글에 새로운 댓글 작성
     *
     * */
    @Post('/comment')
    @ApiCreatedResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async createComment(@Body() createCommentDto: CreateCommentDto): Promise<ResponseDto<any>> {
        const state = await this.boardService.createComment(createCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 등록에 실패하였습니다.');
    }

    /*
     *
     *  현재 등록되어 있는 댓글 수정
     *
     * */
    @Patch('/comment')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async updateComment(@Body() updateCommentDto: UpdateCommentDto) {
        const state = await this.boardService.updateComment(updateCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 수정에 실패하였습니다.');
    }

    /*
     *
     * 현재 등록되어 있는 댓글 삭제
     *
     * */
    @Delete('/comment')
    @ApiOkResponse({ description: 'status: success(성공) || error(실패) + message 확인 필요' })
    @ApiNotFoundResponse({
        description: '클라이언트 세팅 문제로 JSON 형식이 이상하면 BAD_REQUEST 가 반환됩니다.',
    })
    @ApiInternalServerErrorResponse({
        description: 'status: exception(일시적인 내부 시스템 오류 백엔드 한테 슬랙해 주세요.)',
    })
    async deleteComment(@Body() deleteCommentDto: DeleteCommentDto) {
        const state = await this.boardService.deleteComment(deleteCommentDto);
        return state ? ResponseDto.success() : ResponseDto.error('댓글 삭제에 실패하였습니다.');
    }
}
