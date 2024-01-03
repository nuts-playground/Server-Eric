import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
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
    // @Redirect('http://localhost:3000/board')
    @Redirect('https://www.seokhoserver.site/board')
    async googleAuthRedirect() {}

    @Get('/to-github')
    @UseGuards(GithubAuthGuard)
    githubAuth() {}

    @Get('/github')
    @UseGuards(GithubAuthGuard)
    // @Redirect('http://localhost:3000/board')
    @Redirect('https://www.seokhoserver.site/board')
    async githubAuthRedirect() {}

    @Get('/to-naver')
    @UseGuards(NaverAuthGuard)
    naverAuth() {}

    @Get('/naver')
    @UseGuards(NaverAuthGuard)
    // @Redirect('http://localhost:3000/board')
    @Redirect('https://www.seokhoserver.site/board')
    async naverAuthRedirect() {}

    @Get('/to-kakao')
    @UseGuards(KakaoAuthGuard)
    kakaoAuth() {}

    @Get('/kakao')
    @UseGuards(KakaoAuthGuard)
    // @Redirect('http://localhost:3000/board')
    @Redirect('https://www.seokhoserver.site/board')
    async kakaoAuthRedirect() {}
}
