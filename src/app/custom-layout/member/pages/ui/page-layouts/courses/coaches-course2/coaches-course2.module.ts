import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesCourse2RoutingModule } from './coaches-course2-routing.module';
import { CoachesCourse2Component } from './coaches-course2.component';


@NgModule({
  declarations: [CoachesCourse2Component],
  imports: [
    CommonModule,
    CoachesCourse2RoutingModule
  ]
})
export class CoachesCourse2Module { }
