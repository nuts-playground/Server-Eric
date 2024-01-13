import {Controller, Get, Redirect, Req, Res, Session, UseGuards} from '@nestjs/common';
import { urlConfig } from '../config/url.config';
import {GoogleAuthGuard, GithubAuthGuard, NaverAuthGuard, KakaoAuthGuard} from './auth.guard';
import { AuthService } from './auth.service';
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req,@Res() res: Response) {
        console.log(req.user)
        res.cookie('test', 'ee')
        res.redirect('http://localhost:3000/users/eric/main')
        res.end();
    }

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
