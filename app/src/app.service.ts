import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World! 에휴 어렵다..';
    }

    getError() {
        throw new Error('냐옹');
    }
}
