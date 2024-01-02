import * as process from 'process';
import { EnvConfig } from './env.config';

interface redisConfigInterface {
    port: number;
    host: string;
    password: string;
}

class RedisConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): redisConfigInterface {
        return {
            port: parseInt(this.getValue('REDIS_PORT')),
            host: this.getValue('REDIS_HOST'),
            password: this.getValue('REDIS_PASSWORD'),
        };
    }

    public getSessionKey(): string {
        return this.getValue('SESSION_SECRET_KEY');
    }
}

export const redisConfig = new RedisConfig(process.env).verifyKey([
    'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD', 'SESSION_SECRET_KEY'
]);
