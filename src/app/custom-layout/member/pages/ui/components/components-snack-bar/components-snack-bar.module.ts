import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsSnackBarRoutingModule } from './components-snack-bar-routing.module';
import { ComponentsSnackBarComponent } from './components-snack-bar.component';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { ComponentsOverviewSnackBarModule } from '../components-overview/components/components-overview-snack-bar/components-overview-snack-bar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsSnackBarComponent],
  imports: [
    CommonModule,
    ComponentsSnackBarRoutingModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    PageLayoutModule,
    ComponentsOverviewSnackBarModule,
    ContainerModule
  ]
})
export class ComponentsSnackBarModule {
}
