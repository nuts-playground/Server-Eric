import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
import { User } from '../../user/entity/user.entity';
import { BoardCategory } from './board-category.entity';
import { BoardComment } from './board-comment.entity';

@Entity({ name: 'board_content' })
export class BoardContent extends CommonTimestamp {
    @PrimaryGeneratedColumn()
    content_id: number;

    @Column({
        length: 50,
    })
    title: string;

    @Column('longtext')
    content: string;

    @ManyToOne(() => BoardCategory, (boardCategory) => boardCategory.boardContent, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'category_id',
        foreignKeyConstraintName: 'fk-board_content-category',
        referencedColumnName: 'category_id',
    })
    category_id: number;

    @ManyToOne(() => User, (user) => user.boardContent, {
        createForeignKeyConstraints: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
        foreignKeyConstraintName: 'fk-board_content-user',
        referencedColumnName: 'user_id',
    })
    user_id: number;

    @OneToMany(() => BoardComment, (board_comment) => board_comment.content_id, {
        cascade: ['update', 'remove'],
        nullable: true,
    })
    boardComment?: BoardComment[];

    private static newBoard(userId: number, categoryId: number, title: string, content: string) {
        const boardContent = new BoardContent();
        boardContent.user_id = userId;
        boardContent.category_id = categoryId;
        boardContent.title = title;
        boardContent.content = content;
        return boardContent;
    }

    static from(userId: number, categoryId: number, title: string, content: string): BoardContent {
        return this.newBoard(userId, categoryId, title, content);
    }
}
