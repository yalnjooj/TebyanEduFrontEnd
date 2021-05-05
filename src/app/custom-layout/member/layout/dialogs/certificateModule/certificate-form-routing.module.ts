import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateFormComponent } from './certificate.form.component';


const routes: Routes = [
  {
    path: '',
    component: CertificateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateFormRoutingModule {
}
