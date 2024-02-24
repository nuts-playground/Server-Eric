import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { BoardService } from './service/board.service';
import {BoardCategoryRepository} from "./repository/board-category.repository";
import {BoardContentRepository} from "./repository/board-content.repository";

@Module({
    controllers: [BoardController],
    providers: [BoardService, BoardCategoryRepository, BoardContentRepository],
})
export class BoardModule {}
