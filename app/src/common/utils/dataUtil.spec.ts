import {
    DateTimeFormatter,
    LocalDateTime,
} from '@js-joda/core';
describe('공통 데이트 유틸 테스트', () => {
    it('현재 시간 가져오기', () => {
        console.log(LocalDateTime.now().format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSSSSS')));
    });
});