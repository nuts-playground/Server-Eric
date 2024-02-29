import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
import { User } from '../../user/entity/user.entity';
import { BoardContent } from './board-content.entity';

@Entity({ name: 'board_comment' })
export class BoardComment extends CommonTimestamp {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({
        length: 100,
    })
    comment: string;

    @ManyToOne(() => User, (user) => user.boardContent, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
        foreignKeyConstraintName: 'fk-board_comment-user',
        referencedColumnName: 'user_id',
    })
    user: User;

    @ManyToOne(() => BoardContent, (boardContent) => boardContent.boardComment, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'content_id',
        foreignKeyConstraintName: 'fk-board_comment-board_content',
        referencedColumnName: 'content_id',
    })
    boardContent: BoardContent;
}
