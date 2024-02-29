import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import { naverConfig } from '../../config/naver.config';
import { SignupDto } from '../../user/dto/signup.dto';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super(naverConfig.getConfig());
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        const { email, name, provider } = profile;
        const member = await this.userService.findByEmail(email);
        if (provider !== 'naver') return false;
        if (!member) {
            const userSignUpDto = new SignupDto(email, name, provider);

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
