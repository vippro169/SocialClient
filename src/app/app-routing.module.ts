import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './social/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProfileComponent } from './social/profile/profile.component';
import { TimelineComponent } from './social/timeline/timeline.component';
import { ProfileEditComponent } from './social/profile-edit/profile-edit.component';
import { FriendsComponent } from './social/friends/friends.component';
import { HomeComponent } from './social/home/home.component';
import { SettingsComponent } from './social/settings/settings.component';
import { PrivacyPolicyComponent } from './social/privacy-policy/privacy-policy.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/:path', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
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