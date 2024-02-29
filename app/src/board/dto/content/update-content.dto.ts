export class UpdateContentDto {
    private readonly category_id: number;
    private readonly content_id: number;
    private readonly user_email: string;

    constructor(categoryId: number, contentId: number, userEmail: string) {
        this.category_id = categoryId;
        this.content_id = contentId;
        this.user_email = userEmail;
    }
}
