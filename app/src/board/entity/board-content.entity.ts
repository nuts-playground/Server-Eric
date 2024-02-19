import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonTimestamp } from '../../common/entity/common-timstamp.entity';
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

    @ManyToOne(
        () => BoardCategory,
        (boardCategory) => boardCategory.boardContent,
        {
            createForeignKeyConstraints: true,
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({
        name: 'category_id',
        foreignKeyConstraintName: 'fk-board_content-board-category',
        referencedColumnName: 'category_id',
    })
    boardCategory: BoardCategory;

    @OneToMany(
        () => BoardComment,
        (board_comment) => board_comment.boardContent,
        {
            cascade: ['update'],
            nullable: false,
        },
    )
    boardComment: BoardComment[];

    @OneToMany(() => BoardLike, (boardLike) => boardLike.boardContent, {
        cascade: ['update'],
        nullable: false,
    })
    boardLike: BoardLike[];
}
