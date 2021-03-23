import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardTabbedRoutingModule } from './page-layout-card-tabbed-routing.module';
import { PageLayoutCardTabbedComponent } from './page-layout-card-tabbed.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutModule } from 'src/app/custom-layout/guest/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/guest/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutDemoModule } from '../../page-layout-demo/page-layout-demo.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/guest/components/breadcrumbs/breadcrumbs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [PageLayoutCardTabbedComponent],
  imports: [
    CommonModule,
    PageLayoutCardTabbedRoutingModule,
    MatTabsModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    PageLayoutDemoModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    MatButtonModule,
    IconModule,
    MatIconModule,
    ContainerModule
  ]
})
export class PageLayoutCardTabbedModule {
}
