import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
import { DeleteBoardContentDto } from '../dto/delete-board-content.dto';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { BoardCategory } from '../entity/board-category.entity';
import { BoardContentRepository } from '../repository/board-content.repository';
import { BoardContent } from '../entity/board-content.entity';
import { CreateBoardContentDto } from '../dto/create-board-content.dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardCategoryRepository: BoardCategoryRepository,
        private readonly boardContentRepository: BoardContentRepository,
        private readonly userService: UserService,
    ) {}
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

    async deleteBoardContent(deleteBoardContentDto: DeleteBoardContentDto) {
        try {
            const user = await this.userService.findByEmail(
                deleteBoardContentDto.getUserEmail(),
            );

            if (!(user instanceof User)) {
                return false;
            } else {
                const userId = user.user_id;
                const query: FindOptionsWhere<BoardContent> = {
                    category_id: deleteBoardContentDto.getCategoryId(),
                    content_id: deleteBoardContentDto.getContentId(),
                    user_id: userId,
                };
                const result =
                    await this.boardContentRepository.softDelete(query);
                return !!result;
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async updateBoardContent() {}

    async likeBoardContent() {}

    async commentBoardContent() {}
}
