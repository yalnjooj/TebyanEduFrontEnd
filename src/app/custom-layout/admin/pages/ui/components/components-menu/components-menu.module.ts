import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsMenuRoutingModule } from './components-menu-routing.module';
import { ComponentsMenuComponent } from './components-menu.component';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { ComponentsOverviewMenuModule } from '../components-overview/components/components-overview-menu/components-overview-menu.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsMenuComponent],
  imports: [
    CommonModule,
    ComponentsMenuRoutingModule,
    SecondaryToolbarModule,
    PageLayoutModule,
    ComponentsOverviewMenuModule,
    BreadcrumbsModule,
    ContainerModule
  ]
})
export class ComponentsMenuModule {
}
