import * as process from 'process';
import { EnvConfig } from './env.config';

interface kakaoOauthInterface {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
}

class KakaoConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): kakaoOauthInterface {
        return {
            clientID: this.getValue('KAKAO_CLIENT_ID'),
            clientSecret: this.getValue('KAKAO_CLIENT_SECRET'),
            callbackURL: this.getValue('KAKAO_OAUTH_CALLBACK_URL'),
            scope: ['profile_nickname', 'account_email'],
        };
    }
}

export const kakaoConfig = new KakaoConfig(process.env).verifyKey(['KAKAO_CLIENT_ID', 'KAKAO_CLIENT_SECRET', 'KAKAO_OAUTH_CALLBACK_URL']);
