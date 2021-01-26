import { UsersComponent } from './dashboard/users/users.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { CertificatesComponent } from './dashboard/certificates/certificates.component';
import { BodyComponent } from './dashboard/body/body.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGlobalGuard } from './gared/auth.globale.guard';
import { LoginComponent } from './registeration/login/login.component';
import { SignupComponent } from './registeration/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthHomePageGuard } from './gared/auth.homePage.guard';
import { ForgotPasswordComponent } from './registeration/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './registeration/reset-password/reset-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGlobalGuard], data: ['GLOBALE'] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGlobalGuard], data: ['GLOBALE'] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGlobalGuard], data: ['DASHBOARD'],
    children: [
      { path: '', redirectTo: 'body', pathMatch: 'full' },
      { path: 'body', component: BodyComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' }
    ]
  },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGlobalGuard], data: ['GLOBALE']  },
  { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthGlobalGuard], data: ['GLOBALE']  },
  { path: 'resetPassword/:idToken', component: ResetPasswordComponent, canActivate: [AuthGlobalGuard], data: ['GLOBALE']  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
