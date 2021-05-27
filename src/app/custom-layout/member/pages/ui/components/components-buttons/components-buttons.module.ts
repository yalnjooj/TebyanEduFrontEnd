import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsButtonsRoutingModule } from './components-buttons-routing.module';
import { ComponentsButtonsComponent } from './components-buttons.component';
import { ComponentsOverviewButtonsModule } from '../components-overview/components/components-overview-buttons/components-overview-buttons.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsButtonsComponent],
  imports: [
    CommonModule,
    ComponentsButtonsRoutingModule,
    ComponentsOverviewButtonsModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    ContainerModule
  ]
})
export class ComponentsButtonsModule {
}
