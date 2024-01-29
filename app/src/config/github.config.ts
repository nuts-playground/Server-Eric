import * as process from 'process';
import { EnvConfig } from './env.config';

interface githubOauthInterface {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
}

class GithubConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): githubOauthInterface {
        return {
            clientID: this.getValue('GHUB_CLIENT_ID'),
            clientSecret: this.getValue(
                'GHUB_CLIENT_SECRET',
            ),
            callbackURL: this.getValue(
                'GHUB_OAUTH_CALLBACK_URL',
            ),
            scope: ['user:email'],
        };
    }
}

export const githubConfig = new GithubConfig(
    process.env,
).verifyKey([
    'GHUB_CLIENT_ID',
    'GHUB_CLIENT_SECRET',
    'GHUB_OAUTH_CALLBACK_URL',
]);
