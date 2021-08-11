import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachesCourse1Component } from './coaches-course1.component';

const routes: Routes = [{ path: '', component: CoachesCourse1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesCourse1RoutingModule { }
