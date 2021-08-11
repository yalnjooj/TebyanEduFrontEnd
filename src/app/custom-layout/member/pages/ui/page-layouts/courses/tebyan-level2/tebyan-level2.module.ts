import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TebyanLevel2RoutingModule } from './tebyan-level2-routing.module';
import { TebyanLevel2Component } from './tebyan-level2.component';


@NgModule({
  declarations: [TebyanLevel2Component],
  imports: [
    CommonModule,
    TebyanLevel2RoutingModule
  ]
})
export class TebyanLevel2Module { }
