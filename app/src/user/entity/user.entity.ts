import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

/*
 * 데이터베이스 USER 테이블과 매핑되는 Entity
 * */
@Entity({ name: 'USER' })
export class User {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
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

    static from(email: string, nickname: string, providerId: string): User {
        const user = new User();
        user.EMAIL = email;
        user.NICKNAME = nickname;
        user.PROVIDER_ID = providerId;
        return user;
    }

    static email(reqEmail: string) {
        const user = new User();
        user.EMAIL = reqEmail;
        return user;
    }
}
