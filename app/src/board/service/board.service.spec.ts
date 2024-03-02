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
    let boardCategoryRepository: BoardCategoryRepository;
    let boardContentRepository: BoardContentRepository;
    let userRepository: UserRepository;

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
            ],
        }).compile();

        boardService = module.get<BoardService>(BoardService);
        userService = module.get<UserService>(UserService);
        boardContentRepository = module.get<BoardContentRepository>(BoardContentRepository);
        boardCategoryRepository = module.get<BoardCategoryRepository>(BoardCategoryRepository);
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
            const okResult = await userService.findByEmail('test123@test.com');
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
        });

        describe('[entity] BoardLike', () => {});

        describe('[entity] BoardComment', () => {});
    });
});
