import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TebyanLevel2Component } from './tebyan-level2.component';

const routes: Routes = [{ path: '', component: TebyanLevel2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TebyanLevel2RoutingModule { }
