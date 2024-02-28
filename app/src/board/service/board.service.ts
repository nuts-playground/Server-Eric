import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
import { DeleteBoardContentDto } from '../dto/board-content/delete-board-content.dto';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { BoardCategory } from '../entity/board-category.entity';
import { BoardContentRepository } from '../repository/board-content.repository';
import { BoardContent } from '../entity/board-content.entity';
import { CreateBoardContentDto } from '../dto/board-content/create-board-content.dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardCategoryRepository: BoardCategoryRepository,
        private readonly boardContentRepository: BoardContentRepository,
        private readonly userService: UserService,
    ) {}

    async getBoardContent(
        contentId: number,
        categoryId?: number,
        userId?: number,
    ): Promise<BoardContent | null> {
        const query: any = { where: { content_id: contentId } }; // 유연성을 위한 형식 어설션
        if (categoryId) {
            query.where.category_id = categoryId;
        }
        if (userId) {
            query.where.user_id = userId; // 매개 변수에 따라 추가 조건 추가
        }
        return await this.boardContentRepository.findOne(query);
    }

    async getBoardCategoryAll(): Promise<BoardCategory[] | null> {
        try {
            return await this.boardCategoryRepository.find();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async getBoardLatestContentList(): Promise<BoardContent[] | null> {
        try {
            return await this.boardContentRepository.find({
                take: 10,
            });
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async createBoardContent(createBoardDto: CreateBoardContentDto) {
        try {
            const writeUser = await this.userService.findByEmail(
                createBoardDto.getUserEmail(),
            );
            if (writeUser instanceof User) {
                const userId = writeUser.user_id;
                const result = await this.boardContentRepository.save(
                    createBoardDto.toEntity(userId),
                );
                return !!result;
            } else {
                return false;
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async deleteBoardContent(
        deleteBoardContentDto: DeleteBoardContentDto,
    ): Promise<BoardContent | boolean> {
        try {
            const user = await this.userService.findByEmail(
                deleteBoardContentDto.getUserEmail(),
            );

            if (!(user instanceof User)) return false;

            const targetBoardContent = await this.getBoardContent(
                deleteBoardContentDto.getContentId(),
                deleteBoardContentDto.getCategoryId(),
                user.user_id,
            );

            if (!(targetBoardContent instanceof BoardContent)) return false;

            const deleteBoardInfo = BoardContent.deleteInfo(targetBoardContent);
            return await this.boardContentRepository.save(deleteBoardInfo);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async updateBoardContent() {}

    async likeBoardContent() {}

    async commentBoardContent() {}
}
