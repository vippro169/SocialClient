import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../../shared/abstracts/base.http-service";
import { AuthGuard } from "../../../auth/auth-guard.service";
import { ErrorMessageService } from "../../../shared/services/error-msg.service";
import { HttpClient } from "@angular/common/http";
import { CommentModel } from "../../../models/comment.model";

const api_path = 'http://localhost:3000/api/comment/';

@Injectable()
export class CommentHttpService extends BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard, errorMsgService: ErrorMessageService) {
        super(http, authGuard, errorMsgService);
    }

    public createComment(userId: string, postId: string, content: string) {
        let request: CreateCommentRequestModel = {
            userId: userId,
            postId: postId,
            content: content
        }
        return this.post(api_path + "create", request);
    }

    public getComments(postId: string) {
        return this.get(api_path + "get-comments/" + postId);
    }

    public editComment(commentId: string, content: string) {
        return this.put(api_path + "edit/" + commentId, content);
    }

    public deleteComment(commentId: string) {
        return this.delete(api_path + "delete/" + commentId);
    }
}

export interface CreateCommentRequestModel {
    userId: string;
    postId: string;
    content: string;
}