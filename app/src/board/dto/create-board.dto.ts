import {BoardContent} from "../entity/board-content.entity";

export class CreateBoardDto {
    private readonly title: string;

    private readonly content: string;

    private readonly category_id: number;

    private readonly user_id: number;

    constructor(
        title: string,
        content: string,
        category_id: number,
        user_id: number
    ) {
        this.title = title;
        this.content = content;
        this.category_id = category_id;
        this.user_id = user_id;
    }

    valiDateParam() {

    }

    isReadyCreate() {

    }

    toEntity(): BoardContent {
        return BoardContent.from(
            this.title,
            this.content,
            this.category_id,
            this.user_id
        )
    }
}
