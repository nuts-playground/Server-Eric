import { Repository } from 'typeorm';
import { mysqlConfig } from '../../../config/mysql.config';

import { CreateContentDto } from '../../dto/content/create-content.dto';
import { BoardContent } from '../../entity/board-content.entity';
import { BoardLike } from '../../entity/board-like.entity';

describe('typeorm version test', () => {
    let boardContentRepository; // custom repository
    let boardLikeRepository;
    const testContentData = new CreateContentDto(
        'test',
        '본문입니다 1234',
        1,
        'rkwhr3256@naver.com',
    ).toEntity(1);

    beforeAll(async () => {
        await mysqlConfig.getTestDataSource.initialize();
    });

    beforeEach(() => {
        boardContentRepository = new Repository<BoardContent>(
            BoardContent,
            mysqlConfig.getTestDataSource.createEntityManager(),
        );
        boardLikeRepository = new Repository<BoardLike>(
            BoardLike,
            mysqlConfig.getTestDataSource.createEntityManager(),
        );
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
    it('좋아요 테스트', async () => {
        // const testLike = new CreateLikeDto(1, 2).toEntity();
        // // const like = await boardLikeRepository.save(testLike);
        // await boardContentRepository.save({
        //     content_id: 2,
        // });
    });

    afterAll(async () => {
        // await mysqlConfig.getTestDataSource.dropDatabase();
    });
});
