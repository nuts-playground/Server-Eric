import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimstamp } from '../../common/entity/common-timstamp.entity';

@Entity({ name: 'board_content' })
export class BoardContent extends CommonTimstamp {
    @PrimaryGeneratedColumn()
    content_id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    user_id: number;

    @Column()
    category_id: number;
}
