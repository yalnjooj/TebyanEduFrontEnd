import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutSimpleLargeHeaderRoutingModule } from './page-layout-simple-large-header-routing.module';
import { PageLayoutSimpleLargeHeaderComponent } from './page-layout-simple-large-header.component';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { PageLayoutDemoModule } from '../../page-layout-demo/page-layout-demo.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [PageLayoutSimpleLargeHeaderComponent],
  imports: [
    CommonModule,
    PageLayoutSimpleLargeHeaderRoutingModule,
    PageLayoutModule,
    PageLayoutDemoModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    ContainerModule
  ]
})
export class PageLayoutSimpleLargeHeaderModule {
}
