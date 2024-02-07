import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardComment } from '../entity/board-comment.entity';

@Injectable()
export class BoardCommentRepository extends Repository<BoardComment> {
    constructor(private dataSource: DataSource) {
        super(BoardComment, dataSource.createEntityManager());
    }
}
