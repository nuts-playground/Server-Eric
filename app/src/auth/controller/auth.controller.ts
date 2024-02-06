import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Redirect,
    Res,
    Session,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../../common/dto/response.dto';
import { urlConfig } from '../../config/url.config';
import {
    GoogleAuthGuard,
    GithubAuthGuard,
    NaverAuthGuard,
    KakaoAuthGuard,
} from '../auth.guard';
import { AuthService } from '../service/auth.service';
import { OauthLoginDto } from '../dto/oauth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/oauth-login')
    async oauthLogin(
        @Body() oauthLoginDto: OauthLoginDto,
    ): Promise<ResponseDto<string | any>> {
        try {
            const targetMethod = oauthLoginDto.getMethod();
            if (typeof targetMethod !== 'string')
                return ResponseDto.badParam(targetMethod);
            const targetUrl =
                urlConfig.getHostUrl() + '/' + 'auth/' + targetMethod;
            return ResponseDto.successData(targetUrl);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

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

    @Get('/logOut')
    async logOut(@Session() session, @Res() res: Response) {
        try {
            const sessionCheck = session.passport;
            if (sessionCheck && sessionCheck.user) {
                res.clearCookie('connect.sid'); // 세션에 사용된 쿠키의 이름을 여기에 지정합니다.
                res.send(true);
            } else {
                return ResponseDto.error('로그인 하지 않은 상태입니다.');
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
