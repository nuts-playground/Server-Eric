import { BoardContent } from '../../entity/board-content.entity';

export class CreateContentDto {
    private readonly title: string;

    private readonly content: string;

    private readonly category_id: number;

    private readonly user_email: string;

    constructor(title: string, content: string, categoryId: number, userEmail: string) {
        this.title = title;
        this.content = content;
        this.category_id = categoryId;
        this.user_email = userEmail;
    }

    getUserEmail(): string {
        return this.user_email;
    }

    toEntity(userId: number): BoardContent {
        return BoardContent.from(this.title, this.content, this.category_id, userId);
    }
}
