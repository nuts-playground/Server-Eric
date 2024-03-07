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
    content_id: number;

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
    user_id: number;

    private static newComment(contentId: number, userId: number, comment: string) {
        const boardComment = new BoardComment();
        boardComment.content_id = contentId;
        boardComment.user_id = userId;
        boardComment.comment = comment;
        return boardComment;
    }

    static from(contentId: number, userId: number, comment: string): BoardComment {
        return this.newComment(contentId, userId, comment);
    }
}
