import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as process from 'process';
import { EnvConfig } from './env.config';

class CorsConfig extends EnvConfig {
    constructor(env: any) {
        super(env);
    }

    public getConfig(): CorsOptions {
        return {
            origin: [this.getValue('ACCESS_CORS_ORIGIN')],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: [
                'Access-Control-Allow-Origin',
                'X-Requested-With',
                'Content-type',
                'Accept',
                'Authorization',
            ],
        };
    }
}

export const corsConfig = new CorsConfig(process.env).verifyKey([
    'ACCESS_CORS_ORIGIN',
]);
