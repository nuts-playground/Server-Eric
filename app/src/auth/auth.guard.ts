import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

// @Injectable()
// export class NaverAuthGuard extends AuthGuard('naver') {
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const result = (await super.canActivate(context)) as boolean;
//         const request = context.switchToHttp().getRequest();
//         await super.logIn(request);
//         return result;
//     }
// }
