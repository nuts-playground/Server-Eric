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
import { mysqlConfig } from '../../src/config/mysql.config';
import { setSession } from '../../src/config/session.config';
import { TestUserRepo } from '../../src/user/repository/test/test-user.repository';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserService } from '../../src/user/service/user.service';

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
        await mysqlConfig.testGetDataSource.initialize();
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
        console.log(userRepository);
        it('정상 케이스', async () => {
            await userRepository.save(TestUserRepo.getTestUser());
            // await new TestBoardCategoryRepo().setTestCategory(); // 카테고리 셋
            const response = await supertest(app.getHttpServer()).get('/board/categoryList');
            expect(response.body.status).toStrictEqual('success');
            expect(response.body.message).toStrictEqual('');
            expect(response.body.data.length).not.toBeNull();
        });
    });

    describe('[GET] /board/latestContentList', () => {
        console.log(userRepository);
        it('정상 케이스', async () => {
            await boardContentRepository.save(TestBoardContentRepo.getTestContent());
            const response = await supertest(app.getHttpServer()).get('/board/latestContentList');
            console.log(response.body);
            // expect(response.body.status).toStrictEqual('success');
            // expect(response.body.message).toStrictEqual('');
            // expect(response.body.data.length).not.toBeNull();
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
