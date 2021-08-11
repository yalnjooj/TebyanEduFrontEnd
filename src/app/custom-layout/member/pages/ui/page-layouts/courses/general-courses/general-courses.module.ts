import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralCoursesRoutingModule } from './general-courses-routing.module';
import { GeneralCoursesComponent } from './general-courses.component';


@NgModule({
  declarations: [GeneralCoursesComponent],
  imports: [
    CommonModule,
    GeneralCoursesRoutingModule
  ]
})
export class GeneralCoursesModule { }
