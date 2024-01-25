import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonTimstamp {
    @CreateDateColumn({
        type: 'timestamp',
    })
    create_dtm: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    update_dtm: Date | null;

    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    delete_dtm: Date | null;
}
