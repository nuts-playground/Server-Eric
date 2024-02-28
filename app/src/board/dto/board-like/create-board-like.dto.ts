import { BoardLike } from '../../entity/board-like.entity';

export class CreateBoardLikeDto {
    private readonly user_id: number;
    private readonly content_id: number;

    constructor(userId: number, contentId: number) {
        this.user_id = userId;
        this.content_id = contentId;
    }

    toEntity(): BoardLike {
        return BoardLike.from(this.user_id, this.content_id);
    }
}
