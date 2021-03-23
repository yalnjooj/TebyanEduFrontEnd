import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './changelog.component';
import { MarkdownModule } from '../markdown.module';
import { SecondaryToolbarModule } from 'src/app/custom-layout/admin/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/app/custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [ChangelogComponent],
  imports: [
    CommonModule,
    ChangelogRoutingModule,
    MarkdownModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    MatButtonModule,
    ContainerModule
  ]
})
export class ChangelogModule {
}
