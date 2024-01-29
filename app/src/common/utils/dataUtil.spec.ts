import {
    convert,
    DateTimeFormatter,
    LocalDate,
    LocalDateTime,
    nativeJs,
} from '@js-joda/core';
describe('공통 데이트 유틸 테스트', () => {
    it('현재 시간 가져오기', () => {
        const dbDate = LocalDate;
        expect(dbDate).toEqual(LocalDate);
    });
});
