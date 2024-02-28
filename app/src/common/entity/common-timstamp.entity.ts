import { Column, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonTimestamp {
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(0)' })
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
