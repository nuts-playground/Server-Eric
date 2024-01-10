import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {}

@Injectable()
export class NaverAuthGuard extends AuthGuard('naver') {}

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {}
