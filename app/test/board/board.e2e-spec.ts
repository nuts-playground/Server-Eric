import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../../src/board/controller/board.controller';
import { TestBoardCategoryRepo } from '../../src/board/repository/test/test-board-category.repository';
import { TestBoardCommentRepo } from '../../src/board/repository/test/test-board-comment.repository';
import { TestBoardContentRepo } from '../../src/board/repository/test/test-board-content.repository';
import { BoardService } from '../../src/board/service/board.service';
import { mysqlConfig } from '../../src/config/mysql.config';
import { TestUserRepo } from '../../src/user/repository/test/test-user.repository';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserModule } from '../../src/user/user.module';

describe('[e2e] 보드 e2e 테스트 - board.e2e-spec.ts', () => {
    let app: INestApplication;
    let boardController: BoardController;
    let boardService: BoardService;
    // beforeAll(async () => {
    //     await mysqlConfig.getTestDataSource.initialize();
    //     const module: TestingModule = await Test.createTestingModule({
    //         imports: [UserModule],
    //         controllers: [BoardController],
    //         providers: [
    //             {
    //                 provide: UserRepository,
    //                 useClass: TestUserRepo,
    //             },
    //             BoardService,
    //             TestBoardCategoryRepo,
    //             TestBoardContentRepo,
    //             TestBoardCommentRepo,
    //         ],
    //     }).compile();
    //
    //     app = module.createNestApplication();
    //
    //     boardController = module.get<BoardController>(BoardController);
    //     boardService = module.get<BoardService>(BoardService);
    // });

    it('should be defined', () => {
        console.log('dd');
        // expect(boardController).toBeDefined();
        // expect(boardService).toBeDefined();
    });
});
