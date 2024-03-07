export class UpdateCommentDto {
    private readonly content_id: number;
    private readonly user_email: string;
    private readonly comment_id: number;
    private readonly comment: string;

    constructor(contentId: number, userEmail: string, commentId: number, comment: string) {
        this.content_id = contentId;
        this.user_email = userEmail;
        this.comment_id = commentId;
        this.comment = comment;
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

    getComment() {
        return { comment: this.comment };
    }
}
