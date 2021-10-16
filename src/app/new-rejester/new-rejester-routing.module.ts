import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRejesterComponent } from './new-rejester.component';


const routes: Routes = [
  {
    path: '',
    component: NewRejesterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRejesterRoutingModule {
}
