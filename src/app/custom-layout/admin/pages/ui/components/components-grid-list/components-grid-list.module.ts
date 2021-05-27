import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsGridListRoutingModule } from './components-grid-list-routing.module';
import { ComponentsGridListComponent } from './components-grid-list.component';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { ComponentsOverviewGridListModule } from '../components-overview/components/components-overview-grid-list/components-overview-grid-list.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsGridListComponent],
  imports: [
    CommonModule,
    ComponentsGridListRoutingModule,
    BreadcrumbsModule,
    ComponentsOverviewGridListModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ContainerModule
  ]
})
export class ComponentsGridListModule {
}
