import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimstamp } from '../../common/entity/common-timstamp.entity';

@Entity({ name: 'board_comment' })
export class BoardComment extends CommonTimstamp {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({
        length: 15,
    })
    comment: string;
}
