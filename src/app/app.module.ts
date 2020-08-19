import { ProfileComponent } from './dashboard/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirsTestComponent } from './firs-test/firs-test.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
import { CalendarModule, IslamicService, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePickerComponent } from './tools/date-picker/date-picker.component';
import { BodyComponent } from './dashboard/body/body.component';
import { CertificatesComponent } from './dashboard/certificates/certificates.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { UsersComponent } from './dashboard/users/users.component';
import { DialogBoxComponent } from './tools/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FirsTestComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarFooterOuterComponent,
    DialogSingoutComponent,
    DatePickerComponent,
    ProfileComponent,
    BodyComponent,
    CertificatesComponent,
    ReportsComponent,
    SettingsComponent,
    UsersComponent,
    DialogBoxComponent
  ],
  imports: [
    AppRoutingModule,
    NgxSpinnerModule,
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    AngularModule,
    CalendarModule,
    DatePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BrowserModule, SlimLoadingBarModule],
  entryComponents: [DialogBoxComponent],
  providers: [AuthHomePageGuard, AuthGlobalGuard, IslamicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
