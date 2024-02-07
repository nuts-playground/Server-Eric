import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardCategory } from '../entity/board-category.entity';

@Injectable()
export class BoardCategoryRepository extends Repository<BoardCategory> {
    constructor(private dataSource: DataSource) {
        super(BoardCategory, dataSource.createEntityManager());
    }
}
