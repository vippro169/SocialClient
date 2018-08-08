import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found.component';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './social/authentication/authentication.component';

const appRoutes: Routes = [
  {
    path: '', component: AuthenticationComponent
    // children: [
    //   { path: 'signin', component: AuthenticationComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }