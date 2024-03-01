export class UpdateContentDto {
    private readonly category_id: number;
    private readonly content_id: number;
    private readonly user_email: string;
    private readonly title: string;
    private readonly content: string;

    constructor(categoryId: number, contentId: number, userEmail: string, content: string, title: string) {
        this.category_id = categoryId;
        this.content_id = contentId;
        this.user_email = userEmail;
        this.content = content;
        this.title = title;
    }

    getEmail(): string {
        return this.user_email;
    }

    getContentId(): number {
        return this.content_id;
    }

    getCategoryId(): number {
        return this.category_id;
    }

    getUpdateContent()  {
        return {
            title: this.title,
            content: this.content,
        }
    }
}
