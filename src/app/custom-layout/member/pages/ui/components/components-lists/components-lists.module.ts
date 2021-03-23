import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsListsRoutingModule } from './components-lists-routing.module';
import { ComponentsListsComponent } from './components-lists.component';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { ComponentsOverviewListsModule } from '../components-overview/components/components-overview-lists/components-overview-lists.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsListsComponent],
  imports: [
    CommonModule,
    ComponentsListsRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    ComponentsOverviewListsModule,
    ContainerModule
  ]
})
export class ComponentsListsModule {
}
