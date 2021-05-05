import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates.component';


const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent
  },
  {
    path: 'noUsed!!!',
    loadChildren: () => import('src/app/custom-layout/member/layout/dialogs/certificateModule/certificate.form.module').then(m => m.CertificateFormModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule {
}
