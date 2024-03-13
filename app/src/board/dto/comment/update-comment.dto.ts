export class UpdateCommentDto {
    private readonly user_email: string;
    private readonly content_id: number;
    private readonly comment_id: number;
    private readonly comment: string;

    constructor(userEmail: string, contentId: number, commentId: number, comment: string) {
        this.user_email = userEmail;
        this.content_id = contentId;
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
