import { BoardService } from './board.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { DataSource } from 'typeorm';
import {mysqlConfig} from "../../config/mysql.config";
import {BoardCategory} from "../entity/board-category.entity";
import {BoardContentRepository} from "../repository/board-content.repository";
import {UserService} from "../../user/service/user.service";
import {BoardContent} from "../entity/board-content.entity";
import {UserRepository} from "../../user/repository/user.repository";
import { TestMockBoardCategoryRepo} from "../repository/test/test-board-category.repository";
import {TestUserRepo} from "../../user/repository/test/test-user.repository";
import {TestBoardContentRepo} from "../repository/test/test-board-content.repository";

describe('보드 서비스 테스트', () => {
    let boardService: BoardService;
    let userService: UserService;
    let boardCategoryRepository: BoardCategoryRepository;
    let boardContentRepository: BoardContentRepository;
    let userRepository: UserRepository
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardService,
                UserService,
                {
                    provide: BoardContentRepository,
                    useClass: TestBoardContentRepo
                },
                {
                    provide: UserRepository,
                    useClass: TestUserRepo
                },
                {
                    provide: BoardCategoryRepository,
                    useClass: TestMockBoardCategoryRepo
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
    });

    describe('보드 카테고리', () => {
        it('/getBoardCategoryAll - 모든 카테고리 리스트 출력(GET) ', async () => {
            console.log(boardCategoryRepository)
            // let testCategory = new BoardCategory();
            // testCategory.title = 'test'
            // const repoSpy = jest.spyOn(boardCategoryRepository, 'find').mockResolvedValue([
            //     { category_id: 1, title: '자유게시판', boardContent: [] },
            //     { category_id: 2, title: '테스트게시판', boardContent: [] },
            // ]);
            // const result = await boardCategoryRepository.save(testCategory);
            // console.log(result)
            // const categoryList = await boardCategoryRepository.find();
            // expect(categoryList.length).toEqual(2);
            // expect(categoryList[0].title).toEqual('자유게시판');
        });
    });

    describe('보드 컨텐츠', () => {
        it('getBoardContent', () => {});
    });

});
