/* 게시판 게시글 테이블 */
CREATE TABLE `board_content`
(
		`content_id`		INT					NOT NULL 		AUTO_INCREMENT					COMMENT '게시글 고유 번호',
		`user_id`			INT					NOT NULL 										COMMENT '게시글 작성자 고유 번호',
		`category_id`		INT					NOT NULL										COMMENT	'게시글 카테고리 이름',
		`title`				VARCHAR(50)			NOT NULL										COMMENT '게시글 제목',
		`content`			VARCHAR(2000)		NOT NULL										COMMENT '게시글 내용',
		`create_dtm`  	    TIMESTAMP  			NOT NULL 		DEFAULT CURRENT_TIMESTAMP 		COMMENT '게시글 생성시간' ,
		`update_dtm`		TIMESTAMP				NULL										COMMENT '게시글 수정 시간',
		`delete_dtm`		TIMESTAMP				NULL										COMMENT '게시글 비활성화 시간',
		PRIMARY KEY (`content_id`),
		CONSTRAINT  `fk-board_content-user`					    FOREIGN KEY (`user_id`) 		REFERENCES `user`(`user_id`),
  	    CONSTRAINT  `fk-board_content-board_category` 		    FOREIGN KEY (`category_id`) 	REFERENCES `board_category`(`category_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='게시판 게시글 테이블';
