import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
/*
 * 유틸리티 클래스
 * */

dayjs.extend(utc);
dayjs.extend(timezone);
export class DateTimeUtil {
    public static DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';

    public static format(date: number | string | Date, format: string = this.DATE_FORMAT): string {
        return dayjs(date).format(format);
    }

    public static parse(dateString: string, format: string = this.DATE_FORMAT): dayjs.Dayjs {
        return dayjs(dateString, { format });
    }
    public static now(format: string = this.DATE_FORMAT): string {
        return dayjs().format(format);
    }

    public static toUtc(date: dayjs.Dayjs): dayjs.Dayjs {
        return dayjs.utc(date);
    }

    public static toLocal(date: dayjs.Dayjs): dayjs.Dayjs {
        return dayjs(date).local();
    }
}
