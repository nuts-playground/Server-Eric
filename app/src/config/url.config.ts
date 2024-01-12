import * as process from 'process';
import { EnvConfig } from './env.config';

class UrlConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getMainPageUrl(): string {
        return this.getValue('MAIN_PAGE_URL');
    }
}

export const urlConfig = new UrlConfig(process.env).verifyKey(['MAIN_PAGE_URL']);
