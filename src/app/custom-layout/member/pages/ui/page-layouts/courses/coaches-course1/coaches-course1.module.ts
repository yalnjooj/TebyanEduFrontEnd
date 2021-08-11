import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesCourse1RoutingModule } from './coaches-course1-routing.module';
import { CoachesCourse1Component } from './coaches-course1.component';


@NgModule({
  declarations: [CoachesCourse1Component],
  imports: [
    CommonModule,
    CoachesCourse1RoutingModule
  ]
})
export class CoachesCourse1Module { }
