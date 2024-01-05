import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MainService {
    constructor(
        private readonly userService: UserService
    ) {}
    async returnUser(userEmail: string): Promise<User | boolean> {
        try {
            const user = await this.userService.findByEmail(userEmail);
            return user ? user : false;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
