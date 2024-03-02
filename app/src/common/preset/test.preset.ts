import { Test, TestingModule } from '@nestjs/testing';

describe('[해당 테스트 레이어] ${테스트 한글 명 작명 - 해당 파일}', () => {
    beforeAll(async () => {
        // 테스트 전에 한 번만 시작될 구문 작성
        const module: TestingModule = await Test.createTestingModule({}).compile();
    });

    beforeEach(() => {
        // 테스트 함수들 실행 전 마다 실행구문 작성
    });

    it('should be defined ', () => {
        //메소드들 undefined 인지 체크
    });

    describe('외부 [${entity}] 관련', () => {
        // 의존성 외부 멤버들 테스트

        it('[method] ${method 명}', async () => {
            // 멤버로 가져와서 실행하는 메서드들 테스트
        });
    });

    describe('내부 [${entity}] 관련', () => {
        // 현재 테스트 레이어의 메인 entity 관련 정의

        describe('[entity] ${entity 명}', () => {
            describe('[method] ${method 명}]', () => {
                it('한글로 케이스 정의', async () => {});
                // ...
            });
        });
    });

    afterEach(() => {
        // 테스트 함수들 끝날 때 마다 실행구문 작성
    });

    afterAll(() => {
        // 모든 구문 종료 후 한 번만 실행할 구문 작성
    });
});
