import {
    Body,
    Controller,
    Get,
    Post,
    Redirect,
    Req,
    Res,
    Session,
    UseGuards,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../../common/dto/response.dto';
import { urlConfig } from '../../config/url.config';
import { GoogleAuthGuard, GithubAuthGuard, KakaoAuthGuard } from '../auth.guard';
import { AuthService } from '../service/auth.service';
import { OauthLoginDto } from '../dto/oauth-login.dto';

@ApiExcludeController()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/oauth-login')
    async oauthLogin(@Body() oauthLoginDto: OauthLoginDto): Promise<ResponseDto<string | any>> {
        const targetMethod = oauthLoginDto.getMethod();
        if (typeof targetMethod !== 'string') {
            return ResponseDto.badParam('인증할 수 없는 로그인 메서드입니다.', targetMethod);
        }
        const targetUrl = urlConfig.getHostUrl() + '/' + 'auth/' + targetMethod;
        return ResponseDto.successData(targetUrl);
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

    // @Get('/to-naver')
    // @UseGuards(NaverAuthGuard)
    // naverAuth() {}
    //
    // @Get('/naver')
    // @UseGuards(NaverAuthGuard)
    // @Redirect(urlConfig.getMainPageUrl())
    // async naverAuthRedirect() {}

    @Get('/to-kakao')
    @UseGuards(KakaoAuthGuard)
    kakaoAuth() {}

    @Get('/kakao')
    @UseGuards(KakaoAuthGuard)
    @Redirect(urlConfig.getMainPageUrl())
    async kakaoAuthRedirect() {}

    @Get('/logOut')
    async logOut(@Session() session, @Req() req: Request, @Res() res: Response) {
        const sessionCheck = session.passport;
        if (sessionCheck && sessionCheck.user) {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
                res.clearCookie('connect.sid');
                res.send(true);
            });
        } else {
            res.send(instanceToPlain(ResponseDto.error('로그인 하지 않은 상태입니다.')));
        }
    }
}
