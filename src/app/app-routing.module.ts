import { TaskComponent } from './task/task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
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
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthHomePageGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthHomePageGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGlobalGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthHomePageGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthHomePageGuard] },
  { path: 'resetPassword/:idToken', component: ResetPasswordComponent, canActivate: [AuthHomePageGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
