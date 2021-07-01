import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateViewComponent } from './certificate.view.component';


const routes: Routes = [
  {
    path: '',
    component: CertificateViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateViewRoutingModule {
}
