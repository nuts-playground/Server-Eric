import { User } from '../entity/user.entity';

export class UserSignUpDto {
    private readonly email: string;
    private readonly nickname: string;
    private readonly provider_id: string;
    private readonly create_dtm: Date;

    constructor(email: string, nickname: string, providerId: string, createDtm: Date) {
        this.email = email;
        this.nickname = nickname;
        this.provider_id = providerId;
        this.create_dtm = createDtm;
    }

    getEmail(): string {
        return this.email;
    }

    getNickname(): string {
        return this.nickname;
    }

    getProviderId(): string {
        return this.provider_id;
    }

    toEntity(): User {
        return User.from(this.email, this.nickname, this.provider_id, this.create_dtm);
    }
}
