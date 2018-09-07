
export interface PostData {
    id: string;
    userId?: string;
    content: string;
    privacy: string;
    createdDate?: Date;
}

export class PostModel {

    constructor(data?: PostData) {
        if(data) {
            this.id = data.id;
            this.content = data.content;
            this.privacy = data.privacy;
            if (data.userId !== undefined) this.userId = data.userId;
            if (data.createdDate !== undefined) this.createdDate = data.createdDate;
        }
    }

    public id: string;
    public userId: string;
    public content: string;
    public privacy: string;
    public createdDate: Date;
}