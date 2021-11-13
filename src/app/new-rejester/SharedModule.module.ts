import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AddNewStudentComponent } from '../custom-layout/member/pages/ui/page-layouts/courses/tebyan-level1/manage-course/teachers-data/add-new-student/add-new-student.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimePickerModule, DateTimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { IconModule } from '@visurel/iconify-angular';
import { CalendarModule } from 'angular-calendar';
import { BreadcrumbsModule } from '../custom-layout/admin/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from '../custom-layout/admin/components/page-layout/page-layout.module';
import { CustomerCreateUpdateModule } from '../custom-layout/admin/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { TebyanLevel1RoutingModule } from '../custom-layout/member/pages/ui/page-layouts/courses/tebyan-level1/tebyan-level1-routing.module';
import { MatListModule } from '@angular/material/list';
import { SortPipe } from 'src/@vex/pipes/sort.pipe';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  imports: [ 
    CommonModule,
    MatListModule,
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
    CalendarModule,
    TimePickerModule,
    DateTimePickerModule,
    DatePickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatRadioModule

   ],
  declarations: [ SortPipe, AddNewStudentComponent ],
  exports: [ AddNewStudentComponent, SortPipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SortPipe]
})
export class SharedModuleModule {
}
