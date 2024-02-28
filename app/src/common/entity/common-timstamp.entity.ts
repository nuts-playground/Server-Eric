import { Column, CreateDateColumn } from 'typeorm';

export abstract class CommonTimestamp {
    @CreateDateColumn({
        type: 'timestamp',
    })
    create_dtm: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
        precision: 6,
    })
    update_dtm: Date | null;

    @Column({
        type: 'timestamp',
        nullable: true,
        precision: 6,
    })
    delete_dtm: Date | null;
}
