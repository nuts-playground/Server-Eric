import { Repository } from 'typeorm';
import { DateUtil } from '../../../common/utils/date.util';
import { mysqlConfig } from '../../../config/mysql.config';

import { CreateBoardContentDto } from '../../dto/create-board-content.dto';
import { BoardContent } from '../../entity/board-content.entity';

describe('typeorm version test', () => {
    let boardContentRepository; // custom repository
    const testContentData = new CreateBoardContentDto(
        'test',
        '본문입니다',
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
    });

    it('delete test', async () => {
        await boardContentRepository.save(testContentData);
        const findBoard = await boardContentRepository.findOne({
            where: { content_id: 1 },
        });
        const curDate = DateUtil.dateNow();
        findBoard.update_dtm = curDate;
        findBoard.delete_dtm = curDate;
        //
        const result = await boardContentRepository.save(findBoard);
        console.log(result);
    });

    afterAll(async () => {
        // await mysqlConfig.getTestDataSource.dropDatabase();
    });
});
