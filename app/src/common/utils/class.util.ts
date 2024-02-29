export class ClassUtil {
    static checkDelete<T>(target: T): boolean {
        return target['delete_dtm'] > 0;
    }

    static getFunctionName(): string {
        const stack = new Error().stack.split('\n');
        const caller = stack[2];
        const match = caller.match(/at (.*?)\s\(/);
        if (match && match.length > 1) {
            return `target => ${match[1]}`;
        }
        return '';
    }
}
