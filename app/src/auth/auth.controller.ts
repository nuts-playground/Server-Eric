import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { urlConfig } from '../config/url.config';
import { GoogleAuthGuard, GithubAuthGuard, NaverAuthGuard, KakaoAuthGuard} from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    @Redirect(urlConfig.getMainPageUrl())
    async googleAuthRedirect() {}

    @Get('/to-github')
    @UseGuards(GithubAuthGuard)
    githubAuth() {}

    @Get('/github')
    @UseGuards(GithubAuthGuard)
    @Redirect(urlConfig.getMainPageUrl())
    async githubAuthRedirect() {}

    @Get('/to-naver')
    @UseGuards(NaverAuthGuard)
    naverAuth() {}

    @Get('/naver')
    @UseGuards(NaverAuthGuard)
    @Redirect(urlConfig.getMainPageUrl())
    async naverAuthRedirect() {}

    @Get('/to-kakao')
    @UseGuards(KakaoAuthGuard)
    kakaoAuth() {}

    @Get('/kakao')
    @UseGuards(KakaoAuthGuard)
    @Redirect(urlConfig.getMainPageUrl())
    async kakaoAuthRedirect() {}
}
