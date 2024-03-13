export class DeleteContentDto {
    private readonly user_email: string;
    private readonly category_id: number;
    private readonly content_id: number;

    constructor(userEmail: string, categoryId: number, contentId: number) {
        this.user_email = userEmail;
        this.category_id = categoryId;
        this.content_id = contentId;
    }

    getUserEmail(): string {
        return this.user_email;
    }

    getCategoryId(): number {
        return this.category_id;
    }

    getContentId(): number {
        return this.content_id;
    }
}
