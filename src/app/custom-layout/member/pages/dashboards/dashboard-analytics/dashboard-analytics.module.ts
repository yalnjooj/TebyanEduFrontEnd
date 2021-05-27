import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAnalyticsRoutingModule } from './dashboard-analytics-routing.module';
import { DashboardAnalyticsComponent } from './dashboard-analytics.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from 'src/app/custom-layout/member/components/chart/chart.module';
import { MatIconModule } from '@angular/material/icon';
import { WidgetQuickLineChartModule } from 'src/app/custom-layout/member/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import { WidgetQuickValueCenterModule } from 'src/app/custom-layout/member/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetQuickValueStartModule } from 'src/app/custom-layout/member/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import { WidgetLargeGoalChartModule } from 'src/app/custom-layout/member/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import { IconModule } from '@visurel/iconify-angular';
import { WidgetAssistantModule } from 'src/app/custom-layout/member/components/widgets/widget-assistant/widget-assistant.module';
import { WidgetLargeChartModule } from 'src/app/custom-layout/member/components/widgets/widget-large-chart/widget-large-chart.module';
import { WidgetTableModule } from 'src/app/custom-layout/member/components/widgets/widget-table/widget-table.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { MatButtonModule } from '@angular/material/button';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [DashboardAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule,
    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    IconModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule
  ]
})
export class DashboardAnalyticsModule {
}
