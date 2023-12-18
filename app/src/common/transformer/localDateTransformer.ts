import { ValueTransformer } from 'typeorm';
import * as dayjs from 'dayjs';
import { DateTimeUtil } from '../utils/date.util';


export class LocalDateTimeTransformer implements ValueTransformer {

    to(value: dayjs.Dayjs): string {
        // 데이터베이스로 저장하기 전에 날짜를 문자열로 변환
        return DateTimeUtil.format(DateTimeUtil.toUtc(value).toDate());
    }

    from(value: string | number | Date): dayjs.Dayjs {
        // 데이터베이스에서 가져온 문자열을 날짜로 변환하고 로컬 시간대로 변환
        return DateTimeUtil.toLocal(DateTimeUtil.parse(value.toString()));
    }
}
