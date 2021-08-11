import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisionCourseRoutingModule } from './supervision-course-routing.module';
import { SupervisionCourseComponent } from './supervision-course.component';


@NgModule({
  declarations: [SupervisionCourseComponent],
  imports: [
    CommonModule,
    SupervisionCourseRoutingModule
  ]
})
export class SupervisionCourseModule { }
