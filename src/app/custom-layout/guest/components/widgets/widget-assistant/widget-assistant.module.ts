import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAssistantComponent } from './widget-assistant.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [WidgetAssistantComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule,
    TranslateModule
  ],
  exports: [WidgetAssistantComponent]
})
export class WidgetAssistantModule {
}
