import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollbarModule } from 'src/app/custom-layout/admin/components/scrollbar/scrollbar.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { PageLayoutModule } from 'src/app/custom-layout/admin/components/page-layout/page-layout.module';
import { MatNativeDateModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [CalendarComponent, CalendarEditComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ScrollbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    PageLayoutModule,
    MatNativeDateModule,
    IconModule,
    ContainerModule
  ],
  entryComponents: [CalendarEditComponent]
})
export class CalendarModule {
}
