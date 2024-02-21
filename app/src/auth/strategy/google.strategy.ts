import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { googleConfig } from '../../config/google.config';
import { UserSignUpDto } from '../../user/dto/user-signup.dto';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super(googleConfig.getConfig());
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ): Promise<any> {
        const { name, emails, provider } = profile;
        const email = emails[0].value;
        const member = await this.userService.findByEmail(email);

        if (provider !== 'google') return false;

        if (!member) {
            const userName = name.familyName + name.givenName;
            const userSignUpDto = new UserSignUpDto(email, userName, provider);

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
