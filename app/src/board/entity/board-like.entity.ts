import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
import { User } from '../../user/entity/user.entity';
import { BoardContent } from './board-content.entity';

@Entity({ name: 'board_like' })
export class BoardLike extends CommonTimestamp {
    @PrimaryGeneratedColumn()
    like_id: number;

    @Column()
    content_id: number;

    @Column()
    user_id: number;
    @ManyToOne(() => User, (user) => user.boardLike, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
        foreignKeyConstraintName: 'fk-board_like-user',
        referencedColumnName: 'user_id',
    })
    user: User;

    @ManyToOne(() => BoardContent, (boardContent) => boardContent.boardLike, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
        cascade: ['soft-remove'],
    })
    @JoinColumn({
        name: 'content_id',
        foreignKeyConstraintName: 'fk-board_like-board_content',
        referencedColumnName: 'content_id',
    })
    boardContent: BoardContent;

    private static newLike(userId: number, contentId: number): BoardLike {
        const newLike = new BoardLike();
        newLike.user_id = userId;
        newLike.content_id = contentId;
        return newLike;
    }

    static from(userId: number, contentId: number): BoardLike {
        const like = new BoardLike();
        like.user_id = userId;
        like.content_id = contentId;

        return like;
    }
}
