import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LocalDateTimeTransformer } from '../../common/transformer/localDateTransformer';

/*
 * 데이터베이스 USER 테이블과 매핑되는 Entity
 * */
@Entity({ name: 'USER' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nickname: string;

    @Column()
    provider_id: string;

    @CreateDateColumn()
    create_dtm: Date;

    @Column({
        nullable: true,
        type: 'timestamp',
    })
    update_dtm: Date | null;

    @Column({
        nullable: true,
        type: 'timestamp',
    })
    delete_dtm: Date | null;

    static from(email: string, nickname: string, providerId: string, createDtm: Date): User {
        const user = new User();
        user.email = email;
        user.nickname = nickname;
        user.provider_id = providerId;
        user.create_dtm = createDtm;
        return user;
    }

    static email(reqEmail: string) {
        const user = new User();
        user.email = reqEmail;
        return user;
    }
}
