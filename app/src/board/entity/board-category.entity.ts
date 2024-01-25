import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board_category' })
export class BoardCategory {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    title: string;
}
