import { BoardContent } from '../../entity/board-content.entity';

export class CreateContentDto {
    private readonly user_email: string;
    private readonly category_id: number;
    private readonly title: string;
    private readonly content: string;

    constructor(userEmail: string, categoryId: number, title: string, content: string) {
        this.user_email = userEmail;
        this.category_id = categoryId;
        this.title = title;
        this.content = content;
    }

    getUserEmail(): string {
        return this.user_email;
    }

    private isTitle() {
        const titleLength = this.title.length;
        return 2 < titleLength && titleLength <= 50;
    }

    private isEmail() {
        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(this.user_email);
    }

    toEntity(userId: number): BoardContent | string {
        if (!this.isTitle()) {
            return '제목은 2글자 이상, 50글자 이하여야 합니다.';
        }

        if (!this.isEmail()) {
            return '올바른 이메일 형식이 아닙니다.';
        }
        return BoardContent.from(userId, this.category_id, this.title, this.content);
    }
}
