import * as process from 'process';
import { EnvConfig } from './env.config';

class UrlConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getMainPageUrl(): string {
        return this.getValue('MAIN_PAGE_URL');
    }

    public getDomainUrl(): string {
        return this.getValue('DOMAIN_NAME');
    }

    public getHostUrl(): string {
        return this.getValue('SERVER_HOST_URL');
    }
}

export const urlConfig = new UrlConfig(process.env).verifyKey(['MAIN_PAGE_URL', 'DOMAIN_NAME', 'SERVER_HOST_URL']);
