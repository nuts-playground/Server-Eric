import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardContent } from '../entity/board-content.entity';

@Injectable()
export class BoardContentRepository extends Repository<BoardContent> {
    constructor(private dataSource: DataSource) {
        super(BoardContent, dataSource.createEntityManager());
    }
}
