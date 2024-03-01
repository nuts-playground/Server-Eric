import { Injectable } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
import { DeleteContentDto } from '../dto/content/delete-content.dto';
import { BoardCategoryRepository } from '../repository/board-category.repository';
import { BoardCategory } from '../entity/board-category.entity';
import { BoardContentRepository } from '../repository/board-content.repository';
import { BoardContent } from '../entity/board-content.entity';
import { CreateContentDto } from '../dto/content/create-content.dto';
import {UpdateContentDto} from "../dto/content/update-content.dto";

@Injectable()
export class BoardService {
    constructor(
        private readonly boardCategoryRepository: BoardCategoryRepository,
        private readonly boardContentRepository: BoardContentRepository,
        private readonly userService: UserService,
    ) {}

    async getUserByEmail(userEmail: string) {
        return await this.userService.findByEmail(userEmail);
    }

    async findContent(
        contentId: number,
        categoryId?: number,
        userId?: number,
    ): Promise<BoardContent | null> {
        const query: any = { where: { content_id: contentId } };

        if (categoryId) query.where.category_id = categoryId;

        if (userId) query.where.user_id = userId;

        return await this.boardContentRepository.findOne(query);
    }

    async getCategoryList(): Promise<BoardCategory[] | null> {
        return await this.boardCategoryRepository.find();
    }

    async getLatestContentList(): Promise<BoardContent[] | null> {
        return await this.boardContentRepository.find({
            take: 10,
        });
    }

    async createContent(createContentDto: CreateContentDto) {
        const reqUserEmail = createContentDto.getUserEmail();
        const user = await this.getUserByEmail(reqUserEmail);

        const notFoundUser = !(user instanceof User);

        if (notFoundUser) return false;

        const userId = user.user_id;
        const userEntity = createContentDto.toEntity(userId);
        const result = await this.boardContentRepository.save(userEntity);
        return !!result;
    }

    async deleteContent(deleteContentDto: DeleteContentDto): Promise<BoardContent | boolean> {
        const reqUserEmail = deleteContentDto.getUserEmail();
        const user = await this.getUserByEmail(reqUserEmail);
        const notFoundUser = !(user instanceof User);

        if (notFoundUser) return false;

        const targetFindContent = await this.findContent(
            deleteContentDto.getContentId(),
            deleteContentDto.getCategoryId(),
            user.user_id,
        );

        const notFoundContent = !(targetFindContent instanceof BoardContent);

        if (notFoundContent) return false;

        const deleteBoardInfo = BoardContent.deleteEntity(targetFindContent);
        return await this.boardContentRepository.save(deleteBoardInfo);
    }

    async updateContent(updateContentDto: UpdateContentDto) {
        const reqUserEmail = updateContentDto.getEmail();
        const user = await this.getUserByEmail(reqUserEmail);

        const notFoundUser = !(user instanceof User);
        if (notFoundUser) return false;
        const targetFindContent = await this.findContent(
            updateContentDto.getContentId(),
            updateContentDto.getCategoryId(),
            user.user_id,
        );

        const notFoundContent = !(targetFindContent instanceof BoardContent);
        if (notFoundContent) return false;

        return await this.boardContentRepository.update(
            updateContentDto.getContentId(),
            updateContentDto.getUpdateContent(),
        )
    }

    // async likeBoardContent() {}

    // async commentBoardContent() {}
}
