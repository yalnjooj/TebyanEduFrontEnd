import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsSliderRoutingModule } from './components-slider-routing.module';
import { ComponentsSliderComponent } from './components-slider.component';
import { BreadcrumbsModule } from 'src/app/custom-layout/guest/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/guest/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/guest/components/page-layout/page-layout.module';
import { ComponentsOverviewSliderModule } from '../components-overview/components/components-overview-slider/components-overview-slider.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsSliderComponent],
  imports: [
    CommonModule,
    ComponentsSliderRoutingModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ComponentsOverviewSliderModule,
    ContainerModule
  ]
})
export class ComponentsSliderModule {
}
