export class UpdateContentDto {
    private readonly user_email: string;
    private readonly category_id: number;
    private readonly content_id: number;
    private readonly title: string;
    private readonly content: string;

    constructor(
        userEmail: string,
        categoryId: number,
        contentId: number,
        title: string,
        content: string,
    ) {
        this.user_email = userEmail;
        this.category_id = categoryId;
        this.content_id = contentId;
        this.title = title;
        this.content = content;
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

    getUpdateContent() {
        return {
            title: this.title,
            content: this.content,
        };
    }
}
