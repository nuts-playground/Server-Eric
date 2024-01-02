import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ResponseDto } from '../common/dto/response.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    async serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user.user_email);
    }

    async deserializeUser(payload: any, done: (err: Error, payload: ResponseDto<string>) => void) {
        const user = await this.userService.findByEmail(payload);
        if (!user) {
            done(new Error('User not found'), ResponseDto.error('유저가 업습니다.'));
        }
        done(null, ResponseDto.success());
    }
}
