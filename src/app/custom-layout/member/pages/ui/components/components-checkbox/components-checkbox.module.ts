import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCheckboxRoutingModule } from './components-checkbox-routing.module';
import { ComponentsCheckboxComponent } from './components-checkbox.component';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { ComponentsOverviewCheckboxModule } from '../components-overview/components/components-overview-checkbox/components-overview-checkbox.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsCheckboxComponent],
  imports: [
    CommonModule,
    ComponentsCheckboxRoutingModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ComponentsOverviewCheckboxModule,
    ContainerModule
  ]
})
export class ComponentsCheckboxModule {
}
