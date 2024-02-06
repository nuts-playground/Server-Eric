import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    async serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user.user_email);
    }

    async deserializeUser(
        payload: any,
        done: (err: Error, payload: any) => void,
    ) {
        const user = await this.userService.findByEmail(payload);

        if (!user) return done(null, null);

        return done(null, user);
    }
}
