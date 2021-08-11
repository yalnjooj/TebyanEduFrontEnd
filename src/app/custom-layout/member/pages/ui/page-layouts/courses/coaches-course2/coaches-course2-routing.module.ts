import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachesCourse2Component } from './coaches-course2.component';

const routes: Routes = [{ path: '', component: CoachesCourse2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesCourse2RoutingModule { }
