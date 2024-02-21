import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { kakaoConfig } from '../../config/kakao.config';
import { UserSignUpDto } from '../../user/dto/user-signup.dto';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super(kakaoConfig.getConfig());
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<any> {
        const { username, _json, provider } = profile;

        const email = _json.kakao_account.email;
        const member = await this.userService.findByEmail(email);

        if (provider !== 'kakao') return false;

        if (!member) {
            const userSignUpDto = new UserSignUpDto(email, username, provider);

            if (userSignUpDto.toEntity() instanceof User) {
                return await this.userService.signUp(userSignUpDto);
            } else {
                return userSignUpDto.valiDateParam();
            }
        } else {
            return member;
        }
    }
}
