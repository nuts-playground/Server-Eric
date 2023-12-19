import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProviderIdEnum } from '../enum/provider-id-enum';
/*
 * 데이터베이스 USER 테이블과 매핑되는 Entity
 * User 테이블에 들어가는 데이터는 모두 여기서 관장한다.
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
    provider_id: ProviderIdEnum;

    @CreateDateColumn()
    create_dtm: Date;

    @UpdateDateColumn()
    update_dtm: Date | null;

    @DeleteDateColumn()
    delete_dtm: Date | null;

    static from(email: string, nickname: string, providerId: ProviderIdEnum, createDtm: Date): User {
        const user = new User();
        user.email = email;
        user.nickname = nickname;
        user.provider_id = providerId;
        user.create_dtm = createDtm;
        return user;
    }
}
