import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRadioRoutingModule } from './components-radio-routing.module';
import { ComponentsRadioComponent } from './components-radio.component';
import { ComponentsOverviewRadioModule } from '../components-overview/components/components-overview-radio/components-overview-radio.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsRadioComponent],
  imports: [
    CommonModule,
    ComponentsRadioRoutingModule,
    ComponentsOverviewRadioModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    ContainerModule
  ]
})
export class ComponentsRadioModule {
}
