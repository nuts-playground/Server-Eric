import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardLike } from '../entity/board-like.entity';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> {
    constructor(private dataSource: DataSource) {
        super(BoardLike, dataSource.createEntityManager());
    }
}
