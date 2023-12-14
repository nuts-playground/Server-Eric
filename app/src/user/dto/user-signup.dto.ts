import { User } from '../entity/user.entity';

export class UserSignUpDto {
    private readonly EMAIL: string;
    private readonly NICKNAME: string;
    private readonly PROVIDER_ID: string;

    constructor(email: string, nickname: string, providerId: string) {
        this.EMAIL = email;
        this.NICKNAME = nickname;
        this.PROVIDER_ID = providerId;
    }

    getEmail(): string {
        return this.EMAIL;
    }

    getNickname(): string {
        return this.NICKNAME;
    }

    getProviderId(): string {
        return this.PROVIDER_ID;
    }

    toEntity(): User {
        return User.from(this.EMAIL, this.NICKNAME, this.PROVIDER_ID);
    }
}
