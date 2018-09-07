import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { BaseHttpService } from "src/app/shared/abstracts/base.http-service";
import { AuthGuard } from "../../../auth/auth-guard.service";
import { ErrorMessageService } from "../../../shared/services/error-msg.service";
import { FriendRequestModel } from "../../../models/friendrequest.model";


const api_path = 'http://localhost:3000/api/friend/';

@Injectable()
export class FriendHttpService extends BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard, errorMsgService: ErrorMessageService) {
        super(http, authGuard, errorMsgService);
    }

    public createFriendRequest(senderId: string, receiverId: string) {
        let request = {
            senderId: senderId,
            receiverId: receiverId
        };
        return this.post(api_path + "create-friend-request/", request);
    }

    public getFriendRequest(userId: string) {
        return this.get(api_path + "get-friend-request/" + userId);
    }

    public getListFriendRequest(userId: string) {
        return this.get(api_path + "get-list-friend-request/" + userId);
    }

    public cancelFriendRequest(requestId: string) {
        return this.delete(api_path + "delete-friend-request/" + requestId);
    }

    public confirmFriendRequest(friendRequest: FriendRequestModel) {
        return this.put(api_path + "confirm-request/" + friendRequest.id, friendRequest);
    }

    public checkFriendship(profileId: string) {
        return this.get(api_path + "check-friendship/" + profileId).pipe(map(data => <boolean>data));
    }

    public getListFriend(userId: string) {
        return this.get(api_path + "get-list-friend/" + userId);
    }

    public unfriend(friendId: string) {
        return this.delete(api_path + "unfriend/" + friendId);
    }
}