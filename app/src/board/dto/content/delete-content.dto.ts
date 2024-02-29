export class DeleteContentDto {
    private readonly category_id: number;
    private readonly content_id: number;
    private readonly user_email: string;

    constructor(categoryId: number, contentId: number, userEmail: string) {
        this.content_id = categoryId;
        this.content_id = contentId;
        this.user_email = userEmail;
    }

    getCategoryId(): number {
        return this.category_id;
    }

    getContentId(): number {
        return this.content_id;
    }

    getUserEmail(): string {
        return this.user_email;
    }
}
