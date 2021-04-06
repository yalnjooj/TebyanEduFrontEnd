import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarUserComponent } from './toolbar-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RelativeDateTimeModule } from 'src/@vex/pipes/relative-date-time/relative-date-time.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { ToolbarUserDropdownComponent, DemoDialogComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';

@NgModule({
  declarations: [ToolbarUserComponent, ToolbarUserDropdownComponent, DemoDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    RelativeDateTimeModule,
    RouterModule,
    MatTooltipModule,
    IconModule
  ],
  exports: [ToolbarUserComponent],
  entryComponents: [ToolbarUserDropdownComponent, DemoDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarUserModule {
}

