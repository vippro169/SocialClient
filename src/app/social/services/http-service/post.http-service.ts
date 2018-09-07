import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../../shared/abstracts/base.http-service";
import { AuthGuard } from "../../../auth/auth-guard.service";
import { ErrorMessageService } from "../../../shared/services/error-msg.service";
import { HttpClient } from "@angular/common/http";
import { PostModel } from "../../../models/post.model";



const api_path = 'http://localhost:3000/api/post/';

@Injectable()
export class PostHttpService extends BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard, errorMsgService: ErrorMessageService) {
        super(http, authGuard, errorMsgService);
    }

    public createPost(userId: string, content: string, privacy: string) {
        let request: CreatePostRequestModel = {
            userId: userId,
            content: content,
            privacy: privacy
        }
        return this.post(api_path + "create", request);
    }

    public getAllPosts(userId: string) {
        return this.get(api_path + "get-all-posts/" + userId);
    }

    public getProfilePosts(userId: string) {
        return this.get(api_path + "get-profile-posts/" + userId);
    }

    public editPost(post: PostModel) {
        return this.put(api_path + "edit/" + post.id, post);
    }

    public deletePost(postId: string){
        return this.delete(api_path + "delete/" + postId);
    }
}

export interface CreatePostRequestModel {
    userId: string;
    content: string;
    privacy: string;
}