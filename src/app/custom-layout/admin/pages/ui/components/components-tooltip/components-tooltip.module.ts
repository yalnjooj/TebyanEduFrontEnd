import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsTooltipRoutingModule } from './components-tooltip-routing.module';
import { ComponentsTooltipComponent } from './components-tooltip.component';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { ComponentsOverviewTooltipModule } from '../components-overview/components/components-overview-tooltip/components-overview-tooltip.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsTooltipComponent],
  imports: [
    CommonModule,
    ComponentsTooltipRoutingModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ComponentsOverviewTooltipModule,
    ContainerModule
  ]
})
export class ComponentsTooltipModule {
}
