export class ClassUtil {
    static checkDelete<T>(target: T): boolean {
        return target['delete_dtm'] > 0;
    }
}
