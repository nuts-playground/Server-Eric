import { Body, Controller, Post } from '@nestjs/common';
import { UserSignUpDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() userSignUpDto: UserSignUpDto): Promise<boolean> {
        return this.authService.register(userSignUpDto);
    }
}
