export class StringUtil {
    static nullCheck(reqStr: string) {
        return reqStr.trim().length > 0;
    }
}
