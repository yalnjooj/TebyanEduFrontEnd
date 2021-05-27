import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsDialogsRoutingModule } from './components-dialogs-routing.module';
import { ComponentsDialogsComponent } from './components-dialogs.component';
import { ComponentsOverviewDialogsModule } from '../components-overview/components/components-overview-dialogs/components-overview-dialogs.module';
import { PageLayoutModule } from 'src/app/custom-layout/guest/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/guest/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/guest/components/breadcrumbs/breadcrumbs.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsDialogsComponent],
  imports: [
    CommonModule,
    ComponentsDialogsRoutingModule,
    ComponentsOverviewDialogsModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ContainerModule
  ]
})
export class ComponentsDialogsModule {
}
