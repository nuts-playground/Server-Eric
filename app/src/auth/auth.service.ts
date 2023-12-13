import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSignUpDto } from '../user/dto/user-signup.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    // async register(userSignupDto: UserSignUpDto): Promise<boolean> {
    //     const user = await this.userService.findByEmail(userSignupDto.EMAIL);
    //     if (!user) {
    //         const state = await this.userService.signUp(userSignupDto);
    //         return !!state;
    //     }
    //     return false;
    // }
}
