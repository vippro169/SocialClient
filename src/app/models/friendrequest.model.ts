export interface FriendRequestData {
    id?: string;
    senderId?: string;
    receiverId?: string;
    confirmed?: boolean;
}

export class FriendRequestModel {

    constructor(data?: FriendRequestData) {
        if(data) {
            if (data.id !== undefined) this.id = data.id;
            if (data.senderId !== undefined) this.senderId = data.senderId;
            if (data.receiverId !== undefined) this.receiverId = data.receiverId;
            if (data.confirmed !== undefined) this.confirmed = data.confirmed;
        }
    }

    public id?: string;
    public senderId?: string;
    public receiverId?: string;
    public confirmed?: boolean;
    public isDone: boolean = false;
}