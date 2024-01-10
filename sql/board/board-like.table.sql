/* 게시판 좋아요 테이블 */
CREATE TABLE `board_like`
(
		`like_id`			INT				NOT NULL		AUTO_INCREMENT						COMMENT '좋아요 고유 번호',
		`user_id`			INT				NOT NULL											COMMENT '좋아요 생성 유저 고유 번호',
		`content_id`		INT				NOT NULL											COMMENT '좋아요 게시글 고유 번호',
		`create_dtm`		TIMESTAMP		NOT NULL		DEFAULT CURRENT_TIMESTAMP			COMMENT '좋아요 생성 시간',
		`delete_dtm`		TIMESTAMP		NULL												COMMENT '좋아요 비활성화 시간',
		PRIMARY KEY (`like_id`),
		CONSTRAINT	`fk-board_like-user`					FOREIGN KEY (`user_id`)				REFERENCES `user`(`user_id`),
		CONSTRAINT	`fk-board_like-board_content`		    FOREIGN KEY (`content_id`)			REFERENCES `board_content`(`content_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='게시판 좋아요 테이블';
