export class GetCommentListDto {
    private readonly content_id: number;

    constructor(contentId: number) {
        this.content_id = contentId;
    }

    getContentId() {
        return this.content_id;
    }
}
