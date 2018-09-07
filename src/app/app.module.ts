import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { NotFoundPageComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './social/signup/signup.component';
import { GlobalAlertComponent } from './shared/components/global-alert/global-alert.component';
import { ErrorMessageService } from './shared/services/error-msg.service';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';
import { ToolsService } from './shared/services/tools.service';
import { ProfileComponent } from './social/profile/profile.component';
import { TimelineComponent } from './social/timeline/timeline.component';
import { PostComponent } from './social/post/post.component';
import { FriendsComponent } from './social/friends/friends.component';
import { ProfileEditComponent } from './social/profile-edit/profile-edit.component';
import { UserHttpService } from './social/services/http-service/user.http-service';
import { PostListComponent } from './social/post-list/post-list.component';
import { AutosizeDirective } from './shared/services/autosize.directive';
import { CommentComponent } from './social/comment/comment.component';
import { PostHttpService } from './social/services/http-service/post.http-service';
import { FriendHttpService } from './social/services/http-service/friend.http-service';
import { CommentHttpService } from './social/services/http-service/comment.http-service';
import { HomeComponent } from './social/home/home.component';
import { SettingsComponent } from './social/settings/settings.component';
import { PrivacyPolicyComponent } from './social/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    SignUpComponent,
    GlobalAlertComponent,
    AppHeaderComponent,
    ProfileComponent,
    TimelineComponent,
    PostComponent,
    FriendsComponent,
    ProfileEditComponent,
    PostListComponent,
    AutosizeDirective,
    CommentComponent,
    HomeComponent,
    SettingsComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: [
          'http://localhost:3000/api/signin',
          'http://localhost:3000/api/signup'
        ]
      }
    })

  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorMessageService,
    ToolsService,

    UserHttpService,
    FriendHttpService,
    PostHttpService,
    CommentHttpService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
