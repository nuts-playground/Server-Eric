import { LocalDateTime } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';
import { DateUtil } from '../utils/date.util';

export class LocalDateTimeTransformer implements ValueTransformer {
    // entity to db
    to(entityValue: LocalDateTime): Date {
        return DateUtil.toDate(entityValue);
    }

    // db to entity
    from(databaseValue: Date): LocalDateTime {
        return DateUtil.toLocalDateTime(databaseValue);
    }
}
