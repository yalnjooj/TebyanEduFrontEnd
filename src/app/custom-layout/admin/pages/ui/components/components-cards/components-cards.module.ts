import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsCardsRoutingModule } from './components-cards-routing.module';
import { ComponentsCardsComponent } from './components-cards.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsOverviewButtonsModule } from '../components-overview/components/components-overview-buttons/components-overview-buttons.module';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { ComponentsOverviewCardsModule } from '../components-overview/components/components-overview-cards/components-overview-cards.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ComponentsCardsComponent],
  imports: [
    CommonModule,
    ComponentsCardsRoutingModule,
    IconModule,
    FlexLayoutModule,
    ComponentsOverviewButtonsModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    ComponentsOverviewCardsModule,
    ContainerModule
  ]
})
export class ComponentsCardsModule {
}
