import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { NotFoundPageComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './social/authentication/authentication.component';
import { GlobalAlertComponent } from './shared/components/global-alert/global-alert.component';
import { ErrorMessageService } from './shared/services/error-msg.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    AuthenticationComponent,
    GlobalAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
          'localhost:3000/signin',
          'localhost:3000/signup'
        ]
      }
    })

  ],
  providers: [
    AuthService,
    AuthGuardService,
    ErrorMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
