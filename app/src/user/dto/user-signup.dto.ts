import { User } from '../entity/user.entity';
import { ProviderIdEnum, ProviderIdEnumValue } from '../enum/provider-id-enum';

type exchangeObj = {
    email: boolean | null;
    nickname: boolean | null;
    provider_id: boolean | null;
};

export class UserSignUpDto {
    private readonly email: string;
    private readonly nickname: string;
    private readonly provider_id: ProviderIdEnum;
    private readonly create_dtm: Date;

    constructor(email: string, nickname: string, providerId: ProviderIdEnum, createDtm: Date) {
        this.email = email;
        this.nickname = nickname;
        this.provider_id = providerId;
        this.create_dtm = createDtm;
    }

    isEmail(): boolean {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(this.email);
    }

    isNickname(): boolean {
        return 2 <= this.nickname.length && this.nickname.length <= 20;
    }

    isProviderId(): boolean {
        return Object.values(ProviderIdEnumValue).includes(this.provider_id);
    }

    getEmail(): string {
        return this.isEmail() ? this.email : null;
    }

    getNickname(): string {
        return this.isNickname() ? this.nickname : null;
    }

    getProviderId(): ProviderIdEnum {
        return this.isProviderId() ? this.provider_id : null;
    }

    valiDateParam(): exchangeObj {
        const signUpState = {
            email: this.isEmail(),
            nickname: this.isNickname(),
            provider_id: this.isProviderId(),
        };
        const errorMsg = {
            email: '올바른 이메일을 입력해주세요.',
            nickname: '닉네임은 최소 2글자 이상, 20자 이하로 입력해주세요.',
            provider_id: '승인되지 않은 플랫폼으로 접근했습니다.',
        };

        const errorObj = {};

        for (const [key, val] of Object.entries(signUpState)) {
            if (val === false) errorObj[key] = errorMsg[key];
        }

        return errorObj as exchangeObj;
    }

    isReadySignUp(): boolean | exchangeObj {
        const errorObj = this.valiDateParam();
        return Object.values(errorObj).length === 0 ? true : errorObj;
    }

    toEntity(): User {
        return User.from(this.email, this.nickname, this.provider_id, this.create_dtm);
    }
}
