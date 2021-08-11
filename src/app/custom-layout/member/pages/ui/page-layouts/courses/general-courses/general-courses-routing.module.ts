import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralCoursesComponent } from './general-courses.component';

const routes: Routes = [{ path: '', component: GeneralCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralCoursesRoutingModule { }
