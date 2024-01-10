/* 게시판 댓글 테이블 */
CREATE TABLE `board_comment`
(
		`comment_id`		INT					NOT NULL		AUTO_INCREMENT						COMMENT '댓글 고유 번호',
		`user_id`			INT					NOT NULL											COMMENT '댓글 작성자 고유 번호',
		`content_id`		INT					NOT NULL											COMMENT '댓글 고유 번호',
		`comment`			VARCHAR(100)		NOT NULL											COMMENT '댓글 내용',
		`create_dtm`		TIMESTAMP			NOT NULL		DEFAULT CURRENT_TIMESTAMP			COMMENT '댓글 생성 시간',
		`update_dtm`		TIMESTAMP			NULL												COMMENT '댓글 수정 시간',
		`delete_dtm`		TIMESTAMP			NULL												COMMENT '댓글 비활성화 시간',
		PRIMARY KEY (`comment_id`),
		CONSTRAINT  `fk-board_comment-user`						FOREIGN KEY (`user_id`)				REFERENCES `user`(`user_id`),
		CONSTRAINT  `fk-board_comment-board_content`			FOREIGN KEY (`content_id`)			REFERENCES `board_content`(`content_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='게시판 댓글 테이블';
