import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsProgressSpinnerRoutingModule } from './components-progress-spinner-routing.module';
import { ComponentsProgressSpinnerComponent } from './components-progress-spinner.component';
import { BreadcrumbsModule } from 'src/app/custom-layout/guest/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/guest/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/guest/components/page-layout/page-layout.module';
import { ComponentsOverviewProgressSpinnerModule } from '../components-overview/components/components-overview-progress-spinner/components-overview-progress-spinner.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsProgressSpinnerComponent],
  imports: [
    CommonModule,
    ComponentsProgressSpinnerRoutingModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ComponentsOverviewProgressSpinnerModule,
    ContainerModule
  ]
})
export class ComponentsProgressSpinnerModule {
}
