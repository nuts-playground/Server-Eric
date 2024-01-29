import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonTimstamp } from '../../common/entity/common-timstamp.entity';
import { User } from '../../user/entity/user.entity';
import { BoardContent } from './board-content.entity';

@Entity({ name: 'board_comment' })
export class BoardComment extends CommonTimstamp {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({
        length: 15,
    })
    comment: string;

    @ManyToOne(() => User, (user) => user.boardContent)
    @JoinColumn({ name: 'fk-board_comment-user' })
    user: User;

    @ManyToOne(
        () => BoardContent,
        (boardContent) => boardContent.boardComment,
        {
            createForeignKeyConstraints: true,
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'fk-board_comment-board_content' })
    boardContent: BoardContent;
}
