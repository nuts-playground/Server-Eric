/* 게시판 카테고리 테이블 */
CREATE TABLE `board_category`
(
    `category_id`   INT         NOT NULL    AUTO_INCREMENT COMMENT '게시판 카테고리 고유 번호',
    `title`         VARCHAR(20) NOT NULL                   COMMENT '게시판 카테고리 이름',
    PRIMARY KEY (`category_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='게시판 카테고리 테이블';