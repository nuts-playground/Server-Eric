import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';

export class DateUtil {
    // private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
    private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

    static now(): string {
        return LocalDateTime.now().format(this.DATE_TIME_FORMATTER);
    }
}
