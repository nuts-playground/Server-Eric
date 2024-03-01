import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardContent } from './board-content.entity';
import {StringUtil} from "../../common/utils/string.util";

@Entity({ name: 'board_category' })
export class BoardCategory {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({
        length: 20,
        nullable: false,
    })
    title: string;

    @OneToMany(() => BoardContent, (boardContent) => boardContent.boardCategory, {
        cascade: ['update'],
        nullable: false,
    })
    boardContent: BoardContent[];

    static from(title: string): BoardCategory {
        const boardCategory = new BoardCategory();
        if(StringUtil.nullCheck(title)) boardCategory.title = title;
        return boardCategory;
    }
}
