export class DeleteCommentDto {
    private readonly user_email: string;
    private readonly content_id: number;
    private readonly comment_id: number;

    constructor(userEmail: string, contentId: number, commentId: number) {
        this.user_email = userEmail;
        this.content_id = contentId;
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
