import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { BoardController } from './controller/board.controller';
import { BoardCommentRepository } from './repository/board-comment.repository';
import { BoardService } from './service/board.service';
import { BoardCategoryRepository } from './repository/board-category.repository';
import { BoardContentRepository } from './repository/board-content.repository';

@Module({
    imports: [UserModule],
    controllers: [BoardController],
    providers: [
        BoardService,
        BoardCategoryRepository,
        BoardContentRepository,
        BoardCommentRepository,
    ],
})
export class BoardModule {}
