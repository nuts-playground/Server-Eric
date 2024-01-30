import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonTimstamp } from '../../common/entity/common-timstamp.entity';
import { User } from '../../user/entity/user.entity';
import { BoardContent } from './board-content.entity';

@Entity({ name: 'board_like' })
export class BoardLike extends CommonTimstamp {
    @PrimaryGeneratedColumn()
    like_id: number;

    @ManyToOne(
        () => User,
        (user) => user.boardLike,
        {
            createForeignKeyConstraints: true,
            nullable: false,
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({
        name: 'user_id',
        foreignKeyConstraintName: 'fk-board_like-user',
        referencedColumnName: 'user_id'
    })
    user: User;

    @ManyToOne(
        () => BoardContent,
        (boardContent) => boardContent.boardLike,
        {
            createForeignKeyConstraints: true,
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({
        name: 'content_id',
        foreignKeyConstraintName: 'fk-board_like-board_content',
        referencedColumnName: 'content_id'
    })
    boardContent: BoardContent[];
}
