import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirsTestComponent } from './firs-test/firs-test.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComponent } from './task/task.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { LoginComponent } from './registeration/login/login.component';
import { SignupComponent } from './registeration/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthHomePageGuard } from './gared/auth.homePage.guard';
import { AuthGlobalGuard } from './gared/auth.globale.guard';
import { ForgotPasswordComponent } from './registeration/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './registeration/reset-password/reset-password.component';
import { NavbarFooterOuterComponent } from './home/navbar-footer-outer/navbar-footer-outer.component';
import { MaterialModule } from './tools/material/material.module';
import { AngularModule } from './tools/angular/angular.module';
import { DialogSingoutComponent } from './dialogs/singout/dialogSingout/dialog.singout.component';

@NgModule({
  declarations: [
    AppComponent,
    FirsTestComponent,
    ProfileComponent,
    HomeComponent,
    NotFoundComponent,
    TaskComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarFooterOuterComponent,
    DialogSingoutComponent
  ],
  imports: [
    AppRoutingModule,
    NgxSpinnerModule,
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    AngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BrowserModule, SlimLoadingBarModule],
  providers: [AuthHomePageGuard, AuthGlobalGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
