import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardRoutingModule } from './page-layout-card-routing.module';
import { PageLayoutCardComponent } from './page-layout-card.component';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutDemoModule } from '../../page-layout-demo/page-layout-demo.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [PageLayoutCardComponent],
  imports: [
    CommonModule,
    PageLayoutCardRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    PageLayoutDemoModule,
    SecondaryToolbarModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    ContainerModule
  ]
})
export class PageLayoutCardModule {
}
