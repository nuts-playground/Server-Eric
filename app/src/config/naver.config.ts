import * as process from 'process';
import { EnvConfig } from './env.config';

interface naverOauthInterface {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
}

class NaverConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): naverOauthInterface {
        return {
            clientID: this.getValue('NAVER_CLIENT_ID'),
            clientSecret: this.getValue('NAVER_CLIENT_SECRET'),
            callbackURL: this.getValue('NAVER_OAUTH_CALLBACK_URL'),
            scope: ['email', 'profile'],
        };
    }
}

export const naverConfig = new NaverConfig(process.env).verifyKey([
    'NAVER_CLIENT_ID',
    'NAVER_CLIENT_SECRET',
    'NAVER_OAUTH_CALLBACK_URL',
]);
