import { Component, OnInit, Input } from '@angular/core';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { AuthGuard, AuthUserInfo } from '../../auth/auth-guard.service';
import { PostModel } from '../../models/post.model';
import { PostHttpService } from 'src/app/social/services/http-service/post.http-service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(
    private _authGuard: AuthGuard,
    private _postHttpService: PostHttpService,
    private _errorMsgService: ErrorMessageService
  ) { }

  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  };

  @Input()
  public isHome: boolean;

  @Input()
  public userId: string;

  public privacy: string[] = ['Only me', 'Friends', 'Public'];
  public postPrivacy: string = "Friends";
  public postContent: string;

  public posts: PostModel[] = [];
  ngOnInit() {
    this.getPosts();
  }

  public post() {
    this._postHttpService.createPost(this.authUser.userId, this.postContent, this.postPrivacy).subscribe(() => {
      this.postContent = null;
      this.getPosts();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public getPosts() {
    if (this.isHome)
      this._postHttpService.getAllPosts(this.userId).subscribe(res => {
        this.posts = res;
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    else
      this._postHttpService.getProfilePosts(this.userId).subscribe(res => {
        this.posts = res;
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
  }
}
