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
        };
    }
}

export const corsConfig = new CorsConfig(process.env).verifyKey(['ACCESS_CORS_ORIGIN']);
