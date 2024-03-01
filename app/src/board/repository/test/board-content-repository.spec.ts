import { Repository } from 'typeorm';
import { mysqlConfig } from '../../../config/mysql.config';

import { CreateContentDto } from '../../dto/content/create-content.dto';
import { BoardContent } from '../../entity/board-content.entity';
import { BoardLike } from '../../entity/board-like.entity';
import {CreateLikeDto} from "../../dto/like/create-like.dto";
import {User} from "../../../user/entity/user.entity";
import {TestUserRepository} from "../../../user/repository/test-user.repository";
import {TestBoardCategoryRepository} from "../test-board-category.repository";
import {TestBoardContentRepository} from "../test-board-content.repository";
import {TestBoardLikeRepository} from "../test-board-like.repository";

describe('typeorm version test', () => {
    let boardContentRepository: TestBoardContentRepository;
    let boardLikeRepository: TestBoardLikeRepository;
    let userRepository: TestUserRepository;
    let boarCategoryRepository: TestBoardCategoryRepository;

    beforeAll(async () => {
        await mysqlConfig.getTestDataSource.initialize();
    });

    beforeEach(() => {
        boardContentRepository = new TestBoardContentRepository();
        boardLikeRepository = new TestBoardLikeRepository();
        userRepository = new TestUserRepository();
        boarCategoryRepository = new TestBoardCategoryRepository();
    });

    it('게시글 등록', async() => {

        // const result = await userRepository.save(userRepository.getTestUser() as User);
        // console.log(result)
        // const result = await userRepository.update(1,userRepository.getTestUser() as User);
        // console.log(result)
        // const result = await boardContentRepository.save(testContentData);
        // console.log(result)
    });

    it('게시글 가져오기', async () => {
        // async function getBoardContent(
        //     contentId: number,
        //     categoryId?: number,
        //     userId?: number,
        // ): Promise<BoardContent | null> {
        //     const query: any = { where: { content_id: contentId } }; // 유연성을 위한 형식 어설션
        //     if (categoryId) {
        //         query.where.category_id = categoryId;
        //     }
        //     if (userId) {
        //         query.where.user_id = userId; // 매개 변수에 따라 추가 조건 추가
        //     }
        //     return await boardContentRepository.findOne(query);
        // }
        // const targetBoardContent = await getBoardContent(9, 1, 1);
        // // console.log(targetBoardContent);
        // // const testBoardCOntent = BoardContent.deleteInfo(targetBoardContent);
        // await boardContentRepository.softDelete({
        //     content_id: 10,
        // });
        // await boardContentRepository.save(testContentData);
        //
        // const testLike = new CreateLikeDto(1, 10).toEntity();
        // const like = await boardLikeRepository.save(testLike);
        // console.log(like);
        // console.log(ClassUtil.checkDelete(targetBoardContent));
    });

    it('게시글 업데이트', async() => {

    });

    it('게시글 지우기', async () => {
        // await boardContentRepository.save(testContentData);
        // const findBoard = await boardContentRepository.findOne({
        //     where: { content_id: 1 },f
        // });
        // const curDate = DateUtil.dateNow();
        // findBoard.update_dtm = curDate;
        // findBoard.delete_dtm = curDate;
        // //
        // const result = await boardContentRepository.save(findBoard);
        // console.log(result);
    });


    it('좋아요 테스트', async () => {
        // const testLike = new CreateLikeDto(1, 2).toEntity();
        // const like = await boardLikeRepository.save(testLike);
    });


    afterAll(async () => {
        // await mysqlConfig.getTestDataSource.dropDatabase();
    });
});
