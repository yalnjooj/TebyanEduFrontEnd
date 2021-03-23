import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutSimpleRoutingModule } from './page-layout-simple-routing.module';
import { PageLayoutSimpleComponent } from './page-layout-simple.component';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { PageLayoutDemoModule } from '../../page-layout-demo/page-layout-demo.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [PageLayoutSimpleComponent],
  imports: [
    CommonModule,
    PageLayoutSimpleRoutingModule,
    PageLayoutModule,
    PageLayoutDemoModule,
    SecondaryToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    IconModule,
    MatIconModule,
    ContainerModule
  ]
})
export class PageLayoutSimpleModule {
}
