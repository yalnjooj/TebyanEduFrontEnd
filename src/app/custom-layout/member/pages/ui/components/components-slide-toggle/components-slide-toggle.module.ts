import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsSlideToggleRoutingModule } from './components-slide-toggle-routing.module';
import { ComponentsSlideToggleComponent } from './components-slide-toggle.component';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { ComponentsOverviewSlideToggleModule } from '../components-overview/components/components-overview-slide-toggle/components-overview-slide-toggle.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsSlideToggleComponent],
  imports: [
    CommonModule,
    ComponentsSlideToggleRoutingModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ComponentsOverviewSlideToggleModule,
    ContainerModule
  ]
})
export class ComponentsSlideToggleModule {
}
