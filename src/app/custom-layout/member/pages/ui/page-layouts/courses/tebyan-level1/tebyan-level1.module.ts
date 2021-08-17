import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';

import { SecondaryToolbarModule } from 'src/app/custom-layout/member/components/secondary-toolbar/secondary-toolbar.module';
import { PageLayoutModule } from 'src/app/custom-layout/member/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from 'src/app/custom-layout/member/components/breadcrumbs/breadcrumbs.module';
import { CustomerCreateUpdateModule } from 'src/app/custom-layout/member/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TebyanLevel1RoutingModule } from './tebyan-level1-routing.module';
import { DialogAddNewCourse, TebyanLevel1Component } from './tebyan-level1.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { AppMomentModule } from "../../../../../../../datePicker/moment/moment.module";
// import { AppNativeModule } from "../../../../../../../datePicker/native/native.module";

import { MAT_DATE_LOCALE } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import ar from "@angular/common/locales/ar-SA";
// import { MyDateTimeModule } from '../../../../../../../datePicker/my-date-time/my-date-time.module';
// import { MyDateModule } from '../../../../../../../datePicker/my-date/my-date.module';
// import { MyTimeModule } from '../../../../../../../datePicker/my-time/my-time.module';
import { CalendarModule, TimePickerModule, DateTimePickerModule, DatePickerModule  } from '@syncfusion/ej2-angular-calendars';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [TebyanLevel1Component, DialogAddNewCourse],
  imports: [
    CommonModule,
    SecondaryToolbarModule,
    ContainerModule,
    IconModule,
    MatIconModule,
    FlexLayoutModule,
    PageLayoutModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TebyanLevel1RoutingModule,
    // MatDatepickerModule,
    // MatNativeDatetimeModule,
    // MatMomentDateModule,
    // MatMomentDatetimeModule,
    // AppMomentModule,
    // AppNativeModule,
    // MyDateTimeModule,
    // MyDateModule,
    // MyTimeModule,
    // MatDatetimepickerModule,
    CalendarModule,
    TimePickerModule,
    DateTimePickerModule,
    DatePickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatDividerModule



  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TebyanLevel1Module { }
