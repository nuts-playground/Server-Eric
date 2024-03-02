import { DateUtil } from './date.util';

export class TestUtil {
    static getTimeEntity() {
        return {
            create_dtm: DateUtil.dateNow(),
            update_dtm: null,
            delete_dtm: null,
        };
    }
}
