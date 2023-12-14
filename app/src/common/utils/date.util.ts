import * as dayjs from 'dayjs';

/*
 * 유틸리티 클래스
 * */

export class DateTimeUtil {
    public static format(
        date: number | string | Date,
        format: string = 'YYYY-MM-DD HH:mm:ss.SSS',
    ): string {
        return dayjs(date).format(format);
    }

    public static now(format: string = 'YYYY-MM-DD HH:mm:ss.SSS'): string {
        return dayjs().format(format);
    }
}
