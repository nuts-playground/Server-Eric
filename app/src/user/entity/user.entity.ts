import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'USER' })
export class UserEntity {
    @PrimaryColumn()
    EMAIL: string;

    @Column()
    NICKNAME: string;

    @Column()
    PROVIDER_ID: string;

    @CreateDateColumn()
    CREATE_DTM: Date;

    @UpdateDateColumn()
    UPDATE_DTM: Date | null;

    @DeleteDateColumn()
    DELETE_DTM: Date | null;
}
