import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
import { DateUtil } from '../../common/utils/date.util';
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

    private static newBoard(title: string, content: string, category_id: number, user_id: number) {
        const boardContent = new BoardContent();
        boardContent.title = title;
        boardContent.content = content;
        boardContent.category_id = category_id;
        boardContent.user_id = user_id;
        return boardContent;
    }

    static from(
        title: string,
        content: string,
        category_id: number,
        user_id: number,
    ): BoardContent {
        return this.newBoard(title, content, category_id, user_id);
    }
}
