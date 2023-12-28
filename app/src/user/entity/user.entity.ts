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
    user_email: string;

    @Column()
    user_name: string;

    @Column()
    provider_id: ProviderIdEnum;

    @CreateDateColumn()
    create_dtm: Date;

    @UpdateDateColumn()
    update_dtm: Date | null;

    @DeleteDateColumn()
    delete_dtm: Date | null;

    static from(userEmail: string, userName: string, providerId: ProviderIdEnum): User {
        const user = new User();
        user.user_email = userEmail;
        user.user_name = userName;
        user.provider_id = providerId;
        return user;
    }
}
