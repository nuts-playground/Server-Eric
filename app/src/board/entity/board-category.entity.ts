import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardContent } from './board-content.entity';

@Entity({ name: 'board_category' })
export class BoardCategory {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    title: string;

    @OneToMany(
        () => BoardContent,
        (boardContent) => boardContent.boardCategory,
        {
            cascade: ['update'],
            nullable: false,
        },
    )
    boardContent: BoardContent[];
}
