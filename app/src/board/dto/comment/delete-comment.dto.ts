export class DeleteCommentDto {
    private readonly comment_id: number;
    private readonly content_id: number;
    private readonly user_email: string;

    constructor(commentId: number, contentId: number, userEmail: string) {
        this.content_id = contentId;
        this.user_email = userEmail;
        this.comment_id = commentId;
    }

    getCommentId() {
        return this.comment_id;
    }

    getContentId() {
        return this.content_id;
    }

    getEmail() {
        return this.user_email;
    }
}
