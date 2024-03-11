import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { DeleteCommentDto } from '../dto/comment/delete-comment.dto';
import { GetCommentListDto } from '../dto/comment/get-comment-list.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { CreateContentDto } from '../dto/content/create-content.dto';
import { DeleteContentDto } from '../dto/content/delete-content.dto';
import { UpdateContentDto } from '../dto/content/update-content.dto';
import { BoardComment } from '../entity/board-comment.entity';
import { BoardCommentRepository } from '../repository/board-comment.repository';
import { TestMockBoardCommentRepo } from '../repository/test/test-board-comment.repository';
import { BoardService } from './board.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { BoardContentRepository } from '../repository/board-content.repository';
import { UserService } from '../../user/service/user.service';
import { UserRepository } from '../../user/repository/user.repository';
import { TestMockBoardCategoryRepo } from '../repository/test/test-board-category.repository';
import { TestMockUserRepo } from '../../user/repository/test/test-user.repository';
import { TestMockBoardContentRepo } from '../repository/test/test-board-content.repository';
import { User } from '../../user/entity/user.entity';
import { BoardContent } from '../entity/board-content.entity';

describe('[Service] 보드 서비스 테스트 - board.service.ts', () => {
    let boardService: BoardService;
    let userService: UserService;
    let userRepository: UserRepository;
    let boardCategoryRepository: BoardCategoryRepository;
    let boardContentRepository: BoardContentRepository;
    let boardCommentRepository: BoardCommentRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                UserService,
                {
                    provide: BoardContentRepository,
                    useClass: TestMockBoardContentRepo,
                },
                {
                    provide: UserRepository,
                    useClass: TestMockUserRepo,
                },
                {
                    provide: BoardCategoryRepository,
                    useClass: TestMockBoardCategoryRepo,
                },
                {
                    provide: BoardCommentRepository,
                    useClass: TestMockBoardCommentRepo,
                },
            ],
        }).compile();

        boardService = module.get<BoardService>(BoardService);
        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
        boardContentRepository = module.get<BoardContentRepository>(BoardContentRepository);
        boardCategoryRepository = module.get<BoardCategoryRepository>(BoardCategoryRepository);
        boardCommentRepository = module.get<BoardCommentRepository>(BoardCommentRepository);
    });

    it('should be defined', () => {
        expect(boardService).toBeDefined();
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(boardContentRepository).toBeDefined();
        expect(boardCategoryRepository).toBeDefined();
    });

    describe('외부: User 관련', () => {
        it('[method] getUserByEmail', async () => {
            const okResult = await userService.findByEmail('test1@google.com');
            const failResult = await userService.findByEmail('test123@testest.com');

            expect(okResult instanceof User).toBeTruthy();
            expect(failResult).toBeFalsy();
        });
    });

    describe('내부: Board 관련', () => {
        describe('[entity] BoardCategory', () => {
            describe('[method] getCategoryList', () => {
                it('현재 있는 카테고리 row 모두 출력', async () => {
                    const getCategoryList = await boardCategoryRepository.find();
                    expect(getCategoryList).toHaveLength(2);
                });
            });
        });

        describe('[entity] BoardContent', () => {
            describe('[method] findContent', () => {
                it('컨텐츠가 있는 케이스', async () => {
                    const okResult1 = await boardService.findContent(1);
                    const okResult2 = await boardService.findContent(1, 1);
                    const okResult3 = await boardService.findContent(1, 1, 1);
                    expect(okResult1 instanceof BoardContent).toBeTruthy();
                    expect(okResult2 instanceof BoardContent).toBeTruthy();
                    expect(okResult3 instanceof BoardContent).toBeTruthy();
                });
                it('컨텐츠가 없는 케이스', async () => {
                    const failResult1 = await boardService.findContent(2);
                    const failResult2 = await boardService.findContent(2, 2);
                    const failResult3 = await boardService.findContent(1, 3);
                    expect(failResult1).toBeFalsy();
                    expect(failResult2).toBeFalsy();
                    expect(failResult3).toBeFalsy();
                });
            });

            describe('[method] getLatestContentList', () => {
                it('무조건 10개의 최신 글만 내려주는 서비스 ', async () => {
                    const getList = await boardService.getLatestContentList();
                    expect(getList).toHaveLength(10);
                });
            });

            describe('[method] createContent', () => {
                it('정상 케이스', async () => {
                    const createContentDto: CreateContentDto = new CreateContentDto(
                        'test title 1',
                        'test content',
                        1,
                        'test1@google.com',
                    );
                    const result = await boardService.createContent(createContentDto);
                    expect(result).toBeTruthy();
                });

                it('에러 케이스 - 생성하려는 유저가 없음', async () => {
                    const createContentDto: CreateContentDto = new CreateContentDto(
                        'test title 1',
                        'test content',
                        1,
                        'test1123@google.com',
                    );
                    const result = await boardService.createContent(createContentDto);
                    expect(result).toBeFalsy();
                });

                it('에러 케이스 - title 의 길이가 50 초과', async () => {
                    const createContentDto: CreateContentDto = new CreateContentDto(
                        '50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. 50글자 이상은 안됩니다. ',
                        'test contents',
                        1,
                        'test1@google.com',
                    );
                    const result = await boardService.createContent(createContentDto);
                    expect(result).toStrictEqual('제목은 2글자 이상, 50글자 이하여야 합니다.');
                });
            });

            describe('[method] deleteContent', () => {
                it('정상 케이스', async () => {
                    const deleteContentDto: DeleteContentDto = new DeleteContentDto(
                        1,
                        1,
                        'test1@google.com',
                    );
                    const result = await boardService.deleteContent(deleteContentDto);
                    expect(result).toBeInstanceOf(BoardContent);
                    expect(result['update_dtm']).not.toBeNull();
                    expect(result['delete_dtm']).not.toBeNull();
                });

                it('에러 케이스 - 지우려는 게시글이 없음', async () => {
                    const deleteContentDto: DeleteContentDto = new DeleteContentDto(
                        1,
                        2,
                        'test1@google.com',
                    );
                    const result = await boardService.deleteContent(deleteContentDto);
                    expect(result).toBeFalsy();
                });

                it('에러 케이스 - 지우려는 글의 작성자가 일치하지 않음', async () => {
                    const deleteContentDto: DeleteContentDto = new DeleteContentDto(
                        1,
                        1,
                        'test123@google.com',
                    );
                    const result = await boardService.deleteContent(deleteContentDto);
                    expect(result).toBeFalsy();
                });
            });

            describe('[method] updateContent', () => {
                it('정상 케이스', async () => {
                    const updateContentDto: UpdateContentDto = new UpdateContentDto(
                        1,
                        1,
                        'test1@google.com',
                        '새로운 업데이트 컨텐츠지롱',
                        '새로운 타이틀이지롱',
                    );
                    const result = await boardService.updateContent(updateContentDto);
                    expect(result['title']).toStrictEqual(
                        updateContentDto.getUpdateContent().title,
                    );
                    expect(result['content']).toStrictEqual(
                        updateContentDto.getUpdateContent().content,
                    );
                    expect(result['update_dtm']).not.toBeNull();
                });
            });
        });

        describe('[entity] BoardComment', () => {
            describe('[method] getCommentList', () => {
                it('정상 케이스', async () => {
                    const getCommentListDto = new GetCommentListDto(1);
                    const result = await boardService.getCommentList(
                        getCommentListDto.getContentId(),
                    );
                    expect(result[0]).toBeInstanceOf(BoardComment);
                    expect(result.length).not.toStrictEqual(0);
                });
                it('에러 케이스 - 댓글이 없을 때', async () => {
                    const getCommentListDto = new GetCommentListDto(5);
                    const result = await boardService.getCommentList(
                        getCommentListDto.getContentId(),
                    );
                    expect(result.length).toStrictEqual(0);
                });
            });

            describe('[method] createComment', () => {
                it('정상 케이스', async () => {
                    const createCommentDto = new CreateCommentDto(
                        1,
                        'test1@google.com',
                        '댓글이다요옹',
                    );
                    const result = await boardService.createComment(createCommentDto);
                    expect(result['comment']).toStrictEqual('댓글이다요옹');
                    expect(result['create_dtm']).not.toBeNull();
                });

                it('에러 케이스 - 댓글을 달려고 하는 게시글 id 잘못 입력', async () => {
                    const createCommentDto = new CreateCommentDto(
                        123,
                        'test1@google.com',
                        '댓글이다요옹',
                    );
                    const result = await boardService.createComment(createCommentDto);
                    expect(result).toBeNull();
                });
            });

            describe('[method] updateComment', () => {
                it('정상 케이스', async () => {
                    const updateCommentDto = new UpdateCommentDto(
                        1,
                        'test1@google.com',
                        1,
                        '업데이트 댓글이다요옹',
                    );
                    const result = await boardService.updateComment(updateCommentDto);
                    expect(result['comment']).toStrictEqual('업데이트 댓글이다요옹');
                    expect(result['update_dtm']).not.toBeNull();
                    expect(result['comment_id']).toStrictEqual(1);
                });

                it('에러 케이스 - 없는 댓글 아이디에 시도', async () => {
                    const updateCommentDto = new UpdateCommentDto(
                        1,
                        'test1@google.com',
                        5,
                        '업데이트 댓글이다요옹',
                    );
                    const result = await boardService.updateComment(updateCommentDto);
                    expect(result).toBeFalsy();
                });
            });

            describe('[method] deleteComment', () => {
                it('정상 케이스', async () => {
                    const deleteCommentDto = new DeleteCommentDto(1, 1, 'test1@google.com');
                    const result = await boardService.deleteComment(deleteCommentDto);
                    expect(result['update_dtm']).not.toBeNull();
                    expect(result['delete_dtm']).not.toBeNull();
                    expect(result['comment_id']).toStrictEqual(1);
                });

                it('에러 케이스 - 없는 댓글 아이디에 시도', async () => {
                    const deleteCommentDto = new DeleteCommentDto(10, 1, 'test1@google.com');
                    const result = await boardService.deleteComment(deleteCommentDto);
                    expect(result).toBeFalsy();
                });
            });
        });
    });
});
