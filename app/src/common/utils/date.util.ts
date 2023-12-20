import { convert, DateTimeFormatter, LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';

export class DateUtil {
    // private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
    private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

    static now(): string {
        return LocalDateTime.now().format(this.DATE_TIME_FORMATTER);
    }

    static toDate(localDate: LocalDate | LocalDateTime): Date {
        if (!localDate) {
            return null;
        }

        return convert(localDate).toDate();
    }

    static toLocalDateTime(date: Date): LocalDateTime {
        if (!date) {
            return null;
        }
        return LocalDateTime.from(nativeJs(date));
    }
}
