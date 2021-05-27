import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsOverviewProgressSpinnerComponent } from './components-overview-progress-spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HighlightModule } from 'src/app/custom-layout/admin/components/highlight/highlight.module';


@NgModule({
  declarations: [ComponentsOverviewProgressSpinnerComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    HighlightModule
  ],
  exports: [
    ComponentsOverviewProgressSpinnerComponent
  ]
})
export class ComponentsOverviewProgressSpinnerModule {
}
