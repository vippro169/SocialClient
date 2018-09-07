import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolsService } from '../../shared/services/tools.service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { UserHttpService } from '../services/http-service/user.http-service';
import { CommentHttpService } from '../services/http-service/comment.http-service';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(
    private _tools: ToolsService,
    private _errorMsgService: ErrorMessageService,
    private _userHttpService: UserHttpService,
    private _commentHttpService: CommentHttpService
  ) { }

  @Input()
  public comment: CommentModel;

  @Input()
  public authId: string;

  @Output()
  public commentChanged = new EventEmitter();

  public userName: string;
  public userPath: string;

  public isEditing: boolean = false;
  public editComment: string;

  ngOnInit() {
    this._getUserInfo();
  }

  private _getUserInfo() {
    this._userHttpService.getUserNameById(this.comment.userId).subscribe(res => {
      this.userName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
    this._userHttpService.getUserPath(this.comment.userId).subscribe(res => {
      this.userPath = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public edit() {
    this.isEditing = true;
    this.editComment = this.comment.content;
  }

  public cancel() {
    this.isEditing = false;
  }
  
  public save() {
    if(!this._tools.isNullOrEmpty(this.editComment)){
      this._commentHttpService.editComment(this.comment.id, this.editComment).subscribe(res => {
        this.comment.content = this.editComment;
        this.isEditing = false;
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    } 
  }

  public delete() {
    this._commentHttpService.deleteComment(this.comment.id).subscribe(res => {
      this.commentChanged.emit();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

}
