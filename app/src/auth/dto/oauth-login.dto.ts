import { ApiProperty } from '@nestjs/swagger';
import { ProviderIdEnum, ProviderIdEnumValue } from '../../user/enum/provider-id-enum';

type ReturnMsg = {
    target: string;
};

export class OauthLoginDto {
    @ApiProperty({
        example: 'google | github | naver | kakao',
        description: '로그인 하려는 플랫폼 이름 ENUM',
        type: 'enum',
    })
    private readonly method: string;
    private readonly failMsg: ReturnMsg;

    constructor(method: ProviderIdEnum) {
        this.method = method;
        this.failMsg = {
            target: this.method,
        };
    }

    private isPass(): boolean {
        return Object.values(ProviderIdEnumValue).includes(this.method as ProviderIdEnum);
    }

    getMethod(): string | ReturnMsg {
        return this.isPass() ? this.method : this.failMsg;
    }
}
