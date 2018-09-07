
export interface CommentData {
    id: string;
    userId: string;
    postId: string;
    content: string;
    createdDate?: Date;
}

export class CommentModel {
    constructor(data?: CommentData) {
        if(data) {
            this.id = data.id;
            this.userId = data.userId;
            this.postId = data.postId;
            this.content = data.content;
            if (data.createdDate !== undefined) this.createdDate = data.createdDate;
        }
    }

    public id: string;
    public userId: string;
    public postId: string;
    public content: string;
    public createdDate: Date;
}