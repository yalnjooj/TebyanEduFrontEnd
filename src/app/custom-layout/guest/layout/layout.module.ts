import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProgressBarModule } from 'src/app/custom-layout/guest/components/progress-bar/progress-bar.module';
import { SearchModule } from 'src/app/custom-layout/guest/components/search/search.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    ProgressBarModule,
    SearchModule
  ],
  exports: [LayoutComponent]
})
export class GuestLayoutModule {
}
