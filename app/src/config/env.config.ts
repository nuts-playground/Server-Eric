import dotenv = require('dotenv');
import * as path from 'path';

export class EnvConfig {
    constructor(
        private env: {
            // env가 undefined로 떨어질 수 있다.
            [key: string]: string | undefined;
        },
    ) {
        dotenv.config({
            path: path.join(__dirname, `../../.${process.env.NODE_ENV}.env`),
        });
    }

    // 벨류 가져오기
    public getValue(key: string, throwPermission = true): string {
        const value = this.env[key];
        if (!value && throwPermission) throw new Error(`환경 변수 로드 실패 target: ${key}`);

        return value;
    }

    // 데브 모드인지 체크
    public isDevMode(): boolean {
        const mode = this.getValue('MODE', false);
        return mode === 'DEV';
    }

    // 필요한 env 키가 있는지 체크 없으면 throw Error
    public verifyKey(keys: string[]) {
        keys.forEach((key) => this.getValue(key, true));
        return this;
    }
}
