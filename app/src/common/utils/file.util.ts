import * as fs from 'fs';
import * as path from 'path';

import * as glob from 'glob';
export class FileUtil {
    static getAllEntitys(): string[] {
        return glob.sync('src/**/*.entity.ts');
    }
}
