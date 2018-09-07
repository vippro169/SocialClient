import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolsService } from '../../shared/services/tools.service';
import { PostModel } from '../../models/post.model';
import { AuthGuard } from '../../auth/auth-guard.service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { UserHttpService } from '../services/http-service/user.http-service';
import { PostHttpService } from '../services/http-service/post.http-service';
import { CommentHttpService } from '../services/http-service/comment.http-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private _tools: ToolsService,
    private _errorMsgService: ErrorMessageService,
    private _userHttpService: UserHttpService,
    private _postHttpService: PostHttpService,
    private _commentHttpService: CommentHttpService
  ) { }

  @Input()
  public post: PostModel;

  @Input()
  public authId: string;

  @Output()
  public postChanged = new EventEmitter();

  public userName: string;
  public userPath: string;

  public isEditing: boolean = false;
  public privacy: string[] = ['Only me', 'Friends', 'Public'];
  public editPrivacy: string = "Friends";
  public editContent: string;

  public comments: Comment[] = [];
  public commentContent: string;

  ngOnInit() {
    this._getUserInfo();
    this.getComments();
  }

  private _getUserInfo() {
    this._userHttpService.getUserNameById(this.post.userId).subscribe(res => {
      this.userName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
    this._userHttpService.getUserPath(this.post.userId).subscribe(res => {
      this.userPath = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public getComments() {
    this._commentHttpService.getComments(this.post.id).subscribe(res => {
      this.comments = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public save() {
    let post: PostModel = {
      id: this.post.id,
      userId: this.post.userId,
      content: this.editContent,
      privacy: this.editPrivacy,
      createdDate: this.post.createdDate
    }
    this._postHttpService.editPost(post).subscribe(res => {
      this.post.content = this.editContent;
      this.post.privacy = this.editPrivacy;
      this.isEditing = false;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public edit() {
    this.isEditing = true;
    this.editContent = this.post.content;
    this.editPrivacy = this.post.privacy;
  }

  public cancel() {
    this.isEditing = false;
  }

  public delete() {
    this._postHttpService.deletePost(this.post.id).subscribe(res => {
      this.postChanged.emit();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public createComment() {
    if (!this._tools.isNullOrEmpty(this.commentContent)) {
      this._commentHttpService.createComment(this.authId, this.post.id, this.commentContent).subscribe(res => {
        this.commentContent = null;
        this.getComments();
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    };
  }
}
