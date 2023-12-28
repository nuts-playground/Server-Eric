import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.user_email);
    }

    async deserializeUser(payload: any, done: (err: Error, payload: string) => void): Promise<any> {
        const user = await this.userService.findByEmail(payload);
        if (!user) {
            done(new Error('User not found'), null);
        }
        const { user_email, user_name, provider_id } = user as User;
        done(null, user_email);
    }
}
