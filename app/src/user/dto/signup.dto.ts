import { User } from '../entity/user.entity';
import { ProviderIdEnum, ProviderIdEnumValue } from '../enum/provider-id-enum';

type exchangeObj = {
    user_email: boolean | null;
    user_name: boolean | null;
    provider_id: boolean | null;
};

export class SignupDto {
    private readonly user_email: string;
    private readonly user_name: string;
    private readonly provider_id: ProviderIdEnum;

    constructor(userEmail: string, userName: string, providerId: ProviderIdEnum) {
        this.user_email = userEmail;
        this.user_name = userName;
        this.provider_id = providerId;
    }

    private isEmail(): boolean {
        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(this.user_email);
    }

    private isName(): boolean {
        return 2 <= this.user_name.length && this.user_name.length <= 20;
    }

    private isProviderId(): boolean {
        return Object.values(ProviderIdEnumValue).includes(this.provider_id);
    }

    getEmail(): string {
        return this.isEmail() ? this.user_email : null;
    }

    getName(): string {
        return this.isName() ? this.user_name : null;
    }

    getProviderId(): ProviderIdEnum {
        return this.isProviderId() ? this.provider_id : null;
    }

    private valiDateParam(): exchangeObj {
        const signUpState = {
            user_email: this.isEmail(),
            user_name: this.isName(),
            provider_id: this.isProviderId(),
        };
        const errorMsg = {
            user_email: '올바른 이메일을 입력해주세요.',
            user_name: '이름은 최소 2글자 이상 20자 이하로 입력해주세요.',
            provider_id: '승인되지 않은 플랫폼으로 접근했습니다.',
        };

        const errorObj = {};

        for (const [key, val] of Object.entries(signUpState)) {
            if (val === false) errorObj[key] = errorMsg[key];
        }
        return errorObj as exchangeObj;
    }

    isReadySignUp(): boolean {
        const errorObj = this.valiDateParam();
        return Object.values(errorObj).length === 0;
    }

    toEntity(): User | exchangeObj {
        if (this.isReadySignUp()) {
            return User.from(this.user_email, this.user_name, this.provider_id);
        } else {
            return this.valiDateParam();
        }
    }
}
