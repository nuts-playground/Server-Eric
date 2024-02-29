import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
import { DateUtil } from '../../common/utils/date.util';
import { User } from '../../user/entity/user.entity';
import { BoardCategory } from './board-category.entity';
import { BoardComment } from './board-comment.entity';
import { BoardLike } from './board-like.entity';

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

    @Column()
    category_id: number;

    @Column()
    user_id: number;

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
    user: User;

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
    boardCategory: BoardCategory;

    @OneToMany(() => BoardComment, (board_comment) => board_comment.boardContent, {
        cascade: ['update'],
        nullable: false,
    })
    boardComment: BoardComment[];

    @OneToMany(() => BoardLike, (boardLike) => boardLike.content_id, {
        cascade: ['update'],
        nullable: false,
    })
    boardLike: BoardLike[];

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
        const boardContent = new BoardContent();
        boardContent.title = title;
        boardContent.content = content;
        boardContent.category_id = category_id;
        boardContent.user_id = user_id;
        return boardContent;
    }

    static updateEntity(boardContent: BoardContent): BoardContent {
        const newBoardContent = this.newBoard(
            boardContent.title,
            boardContent.content,
            boardContent.category_id,
            boardContent.user_id,
        );

        let dateNow: Date;
        // eslint-disable-next-line prefer-const
        dateNow = DateUtil.dateNow();
        newBoardContent.update_dtm = dateNow;
        return newBoardContent;
    }

    static deleteEntity(boardContent: BoardContent): BoardContent {
        const newBoardContent = this.newBoard(
            boardContent.title,
            boardContent.content,
            boardContent.category_id,
            boardContent.user_id,
        );
        const dateNow = DateUtil.dateNow();
        newBoardContent.update_dtm = dateNow;
        newBoardContent.delete_dtm = dateNow;
        return newBoardContent;
    }
}
