import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TebyanLevel1Component } from './tebyan-level1.component';

const routes: Routes = [{ path: '', component: TebyanLevel1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TebyanLevel1RoutingModule { }
