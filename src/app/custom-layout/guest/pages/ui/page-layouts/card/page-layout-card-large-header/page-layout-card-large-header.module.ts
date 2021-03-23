import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardLargeHeaderRoutingModule } from './page-layout-card-large-header-routing.module';
import { PageLayoutCardLargeHeaderComponent } from './page-layout-card-large-header.component';
import { PageLayoutModule } from 'src/app/custom-layout/guest/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/guest/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutDemoModule } from '../../page-layout-demo/page-layout-demo.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [PageLayoutCardLargeHeaderComponent],
  imports: [
    CommonModule,
    PageLayoutCardLargeHeaderRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    PageLayoutDemoModule,
    FlexLayoutModule,
    ContainerModule
  ]
})
export class PageLayoutCardLargeHeaderModule {
}
