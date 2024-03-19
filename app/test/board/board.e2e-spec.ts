import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { BoardController } from '../../src/board/controller/board.controller';
import { BoardCategoryRepository } from '../../src/board/repository/board-category.repository';
import { BoardCommentRepository } from '../../src/board/repository/board-comment.repository';
import { BoardContentRepository } from '../../src/board/repository/board-content.repository';
import { TestBoardCategoryRepo } from '../../src/board/repository/test/test-board-category.repository';
import { TestBoardCommentRepo } from '../../src/board/repository/test/test-board-comment.repository';
import { TestBoardContentRepo } from '../../src/board/repository/test/test-board-content.repository';
import { BoardService } from '../../src/board/service/board.service';
import { corsConfig } from '../../src/config/cors.config';
import { setGlobalProvider } from '../../src/config/global-provider.config';
import { setSession } from '../../src/config/session.config';
import { TestUserRepo } from '../../src/user/repository/test/test-user.repository';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserService } from '../../src/user/service/user.service';
import { E2eDatabase } from '../utils/e2e-db';

describe('[e2e] 보드 e2e 테스트 - board.e2e-spec.ts', () => {
    let app: INestApplication;
    let boardController: BoardController;
    let boardService: BoardService;
    let userService: UserService;
    let userRepository: UserRepository;
    let boardCategoryRepository: BoardCategoryRepository;
    let boardContentRepository: BoardContentRepository;
    let boardCommentRepository: BoardCommentRepository;
    beforeAll(async () => {
        await E2eDatabase.connect();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardController],
            providers: [
                BoardService,
                UserService,
                {
                    provide: UserRepository,
                    useClass: TestUserRepo,
                },
                {
                    provide: BoardCategoryRepository,
                    useClass: TestBoardCategoryRepo,
                },
                {
                    provide: BoardContentRepository,
                    useClass: TestBoardContentRepo,
                },
                {
                    provide: BoardCommentRepository,
                    useClass: TestBoardCommentRepo,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await setGlobalProvider(app);
        await setSession(app);
        app.enableCors(corsConfig.getConfig());
        await app.init();

        boardController = module.get<BoardController>(BoardController);
        boardService = module.get<BoardService>(BoardService);
        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
        boardCategoryRepository = module.get<BoardCategoryRepository>(BoardCategoryRepository);
        boardContentRepository = module.get<BoardContentRepository>(BoardContentRepository);
        boardCommentRepository = module.get<BoardCommentRepository>(BoardCommentRepository);
    });
    it('should be defined', async () => {
        expect(boardController).toBeDefined();
        expect(boardService).toBeDefined();
        expect(userService).toBeDefined();
        expect(boardCategoryRepository).toBeDefined();
        expect(boardContentRepository).toBeDefined();
        expect(boardCommentRepository).toBeDefined();
    });

    describe('[GET] /board/categoryList', () => {
        it('정상 케이스', async () => {
            await userRepository.save(TestUserRepo.getTestUser());
            await new TestBoardCategoryRepo().setTestCategory(); // 카테고리 셋
            const response = await supertest(app.getHttpServer()).get('/board/categoryList');
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
            expect(response.body.data.length).not.toBeNull();
        });
    });

    describe('[GET] /board/latestContentList', () => {
        it('정상 케이스', async () => {
            // await boardContentRepository.save(TestBoardContentRepo.getTestContent());
            const response = await supertest(app.getHttpServer()).get('/board/latestContentList');
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
            expect(response.body.data.length).not.toBeNull();
        });
    });

    describe('[POST] /board/content', () => {
        it('정상 케이스', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                category_id: 1,
                title: '[POST] e2eTest',
                content: '테스트용 입니드아아.',
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/content')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
        });

        it('실패 케이스 - 없는 유저로 글 등록을 시도 했을 때', async () => {
            const reqData = {
                user_email: 'e2eTest@github.com',
                category_id: 1,
                title: '[POST] e2eTest',
                content: '테스트용 입니드아아.',
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/content')
                .send(reqData);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('게시글 등록에 실패하였습니다.');
        });
    });

    describe('[PATCH] /board/content', () => {
        it('정상 케이스', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                category_id: 1,
                content_id: 1,
                title: '[POST] e2eTest - 수정본',
                content: '테스트용 입니드아아. - 수정본',
            };
            const response = await supertest(app.getHttpServer())
                .patch('/board/content')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
        });

        it('실패 케이스 - category_id 및 content_id 불일치', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                category_id: 10,
                content_id: 10,
                title: '[POST] e2eTest - 수정본',
                content: '테스트용 입니드아아. - 수정본',
            };
            const response = await supertest(app.getHttpServer())
                .patch('/board/content')
                .send(reqData);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('게시글 수정에 실패하였습니다.');
        });
    });

    describe('[POST] /board/commentList', () => {
        it('정상 케이스', async () => {
            await boardCommentRepository.save(TestBoardCommentRepo.getTestComment());
            await boardCommentRepository.save(TestBoardCommentRepo.getTestComment());
            await boardCommentRepository.save(TestBoardCommentRepo.getTestComment());

            const reqData = {
                content_id: 1,
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/commentList')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
            expect(response.body.data.length).toStrictEqual(3);
        });

        it('실패 케이스 - 찾으려는 content_id 잘못 입력', async () => {
            const reqData = {
                content_id: 3,
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/commentList')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
            expect(response.body.data.length).toStrictEqual(0);
        });
    });

    describe('[POST] /board/comment', () => {
        it('정상 케이스', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 1,
                comment: 'post test comment wa!',
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
        });

        it('실패 케이스 - 등록하려는 content_id가 없음', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 123,
                comment: 'post test comment wa!',
            };
            const response = await supertest(app.getHttpServer())
                .post('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('댓글 등록에 실패하였습니다.');
        });
    });

    describe('[PATCH] /board/comment', () => {
        it('정상 케이스', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 1,
                comment_id: 1,
                comment: 'post test comment wa - 수정!',
            };
            const response = await supertest(app.getHttpServer())
                .patch('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
        });

        it('실패 케이스 - 수정하려는 content_id가 없음', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 1,
                comment_id: 100,
                comment: 'post test comment wa - 수정!',
            };
            const response = await supertest(app.getHttpServer())
                .patch('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('댓글 수정에 실패하였습니다.');
        });
    });

    describe('[DELETE] /board/comment', () => {
        it('정상 케이스', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 1,
                comment_id: 1,
            };
            const response = await supertest(app.getHttpServer())
                .delete('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
        });

        it('실패 케이스 - 수정하려는 content_id가 없음', async () => {
            const reqData = {
                user_email: 'test1@google.com',
                content_id: 1,
                comment_id: 100,
                comment: 'post test comment wa - 수정!',
            };
            const response = await supertest(app.getHttpServer())
                .delete('/board/comment')
                .send(reqData);
            expect(response.body.status).toStrictEqual('error');
            expect(response.body.message).toStrictEqual('댓글 삭제에 실패하였습니다.');
        });
    });

    afterAll(async () => {
        await E2eDatabase.close();
        await app.close();
    });
});
