import { Body, Controller, Get, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { UserSignUpDto } from '../user/dto/user-signup.dto';
import { GoogleAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    @Redirect('http://localhost:3000/board')
    async googleAuthRedirect(): Promise<void> {}
}
