import { BoardService } from './board.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { DataSource } from 'typeorm';

describe('보드 서비스 테스트', () => {
    let boardService: BoardService;
    let boardCategoryRepository: BoardCategoryRepository;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                BoardCategoryRepository,
                {
                    provide: DataSource,
                    useValue: {
                        createEntityManager: jest.fn(),
                    },
                },
            ],
        }).compile();

        boardService = module.get<BoardService>(BoardService);
        boardCategoryRepository = module.get<BoardCategoryRepository>(
            BoardCategoryRepository,
        );
    });

    it('should be defined', () => {
        expect(boardService).toBeDefined();
    });

    describe('보드 카테고리 테스트', () => {
        it('/getBoardCategoryAll 모든 카테고리 리스트 출력(GET) ', async () => {
            const repoSpy = jest
                .spyOn(boardCategoryRepository, 'find')
                .mockResolvedValue([
                    { category_id: 1, title: '자유게시판', boardContent: [] },
                    { category_id: 2, title: '테스트게시판', boardContent: [] },
                ]);
            const categoryList = await boardCategoryRepository.find();
            expect(categoryList.length).toEqual(2);
            expect(categoryList[0].title).toEqual('자유게시판');
        });
    });

    describe('보드 컨텐츠 테스트', () => {
        it('getBoardContent', () => {});
    });
});
