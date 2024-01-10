/* 유저 테이블 */
CREATE TABLE `user`
(
 		`user_id`     			INT 				NOT NULL 		AUTO_INCREMENT 					COMMENT '유저의 고유 번호' ,
 		`user_email`  			VARCHAR(50) 		NOT NULL 										COMMENT '유저 이메일' ,
 		`user_name`   			VARCHAR(10) 		NOT NULL 										COMMENT '유저 이름' ,
 		`provider_id` 			VARCHAR(20) 		NOT NULL 										COMMENT '유저 연동 플랫폼' ,
 		`create_dtm`  			TIMESTAMP  			NOT NULL 		DEFAULT CURRENT_TIMESTAMP 		COMMENT '유저 정보 생성 시간' ,
 		`update_dtm`  			TIMESTAMP 			NULL 											COMMENT '유저 정보 수정 시간' ,
 		`delete_dtm`  			TIMESTAMP 			NULL 											COMMENT '유저 정보 비활성화 시간' ,
		PRIMARY KEY (`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='유저 테이블';
