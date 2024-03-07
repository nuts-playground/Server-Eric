export class DeleteCommentDto {
    private readonly content_id: number;
    private readonly user_email: string;
    private readonly comment_id: number;

    constructor(contentId: number, userEmail: string, commentId: number) {
        this.content_id = contentId;
        this.user_email = userEmail;
        this.comment_id = commentId;
    }

    getEmail() {
        return this.user_email;
    }

    getCommentId() {
        return this.comment_id;
    }

    getContentId() {
        return this.content_id;
    }
}
