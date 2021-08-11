import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisionCourseComponent } from './supervision-course.component';

const routes: Routes = [{ path: '', component: SupervisionCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisionCourseRoutingModule { }
