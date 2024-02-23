import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { BoardService } from './service/board.service';
import {BoardCategoryRepository} from "./repository/board-category.repository";

@Module({
    controllers: [BoardController],
    providers: [BoardService, BoardCategoryRepository],
})
export class BoardModule {}
