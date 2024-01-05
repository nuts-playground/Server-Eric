import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthGuard, GithubAuthGuard, NaverAuthGuard, KakaoAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Res() res: Response) {
        return res.redirect('/main');
    }

    @Get('/to-github')
    @UseGuards(GithubAuthGuard)
    githubAuth() {}

    @Get('/github')
    @UseGuards(GithubAuthGuard)
    async githubAuthRedirect(@Res() res: Response) {
        return res.redirect('/main');
    }

    @Get('/to-naver')
    @UseGuards(NaverAuthGuard)
    naverAuth() {}

    @Get('/naver')
    @UseGuards(NaverAuthGuard)
    async naverAuthRedirect(@Res() res: Response) {
        return res.redirect('/main');
    }

    @Get('/to-kakao')
    @UseGuards(KakaoAuthGuard)
    kakaoAuth() {}

    @Get('/kakao')
    @UseGuards(KakaoAuthGuard)
    async kakaoAuthRedirect(@Res() res: Response) {
        return res.redirect('/main');
    }
}
