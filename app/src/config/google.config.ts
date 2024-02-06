import { EnvConfig } from './env.config';

interface googleOauthInterface {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
}

class GoogleConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): googleOauthInterface {
        return {
            clientID: this.getValue('GOOGLE_OAUTH_CLIENT_ID'),
            clientSecret: this.getValue('GOOGLE_OAUTH_CLIENT_SECRET'),
            callbackURL: this.getValue('GOOGLE_OAUTH_CALLBACK_URL'),
            scope: ['email', 'profile'],
        };
    }
}

export const googleConfig = new GoogleConfig(process.env).verifyKey([
    'GOOGLE_OAUTH_CLIENT_ID',
    'GOOGLE_OAUTH_CLIENT_SECRET',
    'GOOGLE_OAUTH_CALLBACK_URL',
]);
