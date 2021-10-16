import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { AuthGuard } from 'src/app/gards/auth.guard';
import { Role } from 'src/app/tools/roles'

const routes: VexRoutes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: CustomLayoutComponent,
    canActivate: [AuthGuard], data: [Role.HOME]
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard], data: [Role.LOGIN]
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/auth/register/register.module').then(m => m.RegisterModule),
    canActivate: [AuthGuard], data: [Role.REGISTER]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('src/app/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [AuthGuard], data: [Role.FORGOT_PASSWORD]
  },
  {
    path: 'reset-password/:idToken',
    loadChildren: () => import('src/app/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [AuthGuard], data: [Role.RESET_PASSWORD]
  },
  {
    path: 'coming-soon',
    loadChildren: () => import('src/app/auth/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
    canActivate: [AuthGuard], data: [Role.COMING_SOON]
  },
  {
    path: 'admin',
    loadChildren: () => import('./custom-layout/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard], data: [Role.ADMIN]
  },
  {
    path: 'member',
    loadChildren: () => import('./custom-layout/member/member.module').then(m => m.MemberModule),
    canActivate: [AuthGuard], data: [Role.MEMBER]
  },
  {
    path: 'newRejester/:link',
    loadChildren: () => import('./new-rejester/new-rejester.module').then(m => m.NewRejesterModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./custom-layout/guest/guest.module').then(m => m.GuestModule),
    canActivate: [AuthGuard], data: [Role.GUEST]
  },
  {
    path: '**',
    loadChildren: () => import('src/app/custom-layout/member/pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
