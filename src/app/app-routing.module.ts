import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './social/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProfileComponent } from './social/profile/profile.component';
import { TimelineComponent } from './social/timeline/timeline.component';
import { ProfileEditComponent } from './social/profile-edit/profile-edit.component';
import { FriendsComponent } from './social/friends/friends.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
      { path: 'timeline', component: TimelineComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'edit', component: ProfileEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }