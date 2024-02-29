import { ProviderIdEnum, ProviderIdEnumValue } from '../../user/enum/provider-id-enum';

type ReturnMsg = {
    badParam: string;
};

export class OauthLoginDto {
    private readonly method: string;
    private readonly failMsg: ReturnMsg = {
        badParam: '인증할 수 없는 로그인 메서드입니다.',
    };
    constructor(method: ProviderIdEnum) {
        this.method = method;
    }

    private isPass(): boolean {
        return Object.values(ProviderIdEnumValue).includes(this.method as ProviderIdEnum);
    }

    public getMethod(): string | ReturnMsg {
        return this.isPass() ? this.method : this.failMsg;
    }
}
