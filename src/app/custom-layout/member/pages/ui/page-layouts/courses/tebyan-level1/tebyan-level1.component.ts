import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFocus from '@iconify/icons-ic/center-focus-strong';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { Subscription } from 'rxjs';
import {patternsEmail, patternsNumber} from 'src/app/tools/patterns';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import icSmartDocument from '@iconify/icons-ic/golf-course';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChangeDataFormDialog } from '../../../../apps/social/social-profile/social-profile.component';
import { DateAdapter } from 'angular-calendar';

export interface PeriodicElement {

  id: number;
  courseNo: number;
  courceName: string;
  beneficiaryType: string;
  level: string;
  startTime: Date;
  catagory: string;
  coache: string;
  typePlace: string;
  organisationName: string;
  hours: number;
  days: number;
  status: boolean;

  // courcesDates: Array<Date>;
  courcesDates: string;
  // trainingPlace: string;

  test1: Date;
  test2: Date;
  oralTest: Date;
  writtenTest: Date;
  certificateName1: string;
  certificateName2: string;
  certificateName3: string;

  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'vex-tebyan-level1',
  templateUrl: './tebyan-level1.component.html',
  styleUrls: ['./tebyan-level1.component.scss']
})
export class TebyanLevel1Component implements OnInit {


  userID: number;
  displayedColumns: string[] = ['id', 'courseNo', 'level', 'catagory', 'beneficiaryType', 'hours', 'days', 'courcesDates', 'startTime', 'typePlace', 'coache', 'organisationName', 'edit2', 'edit', 'updatedAt', 'createdAt'];
  dataSource: any
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icFocus = icFocus;
  icSettings = icSettings
  icPrint = icPrint
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
              private apollo: Apollo,
              private ngxSpinnerService: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.ngxSpinnerService.show()


    this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              id
            }
          }
        `
    }).valueChanges.subscribe(( {data}: any ) => {
      this.userID = data.currentUser.id

      this.apollo.watchQuery({
        query: gql`
            query course($uID: ID!){
            course(uID: $uID){
              id
              status
              hours
              days
              start_time
              test_1
              test_2
              oral_test
              written_test
              updatedAt
              createdAt

              level{
                id
                name
              }
              catagory{
                id
                name
              }
              typePlace{
                id
                name
              }
              courceName{
                id
                name
              }
              coache{
                id
                name
              }
              beneficiaryType{
                id
                companyType
              }
              certificate1{
                id
                certificatename
              }
              certificate2{
                id
                certificatename
              }
              certificate3{
                id
                certificatename
              }
            }
          }
          `,
          variables: {
            uID: data.currentUser.id
          }
      }).valueChanges.subscribe(({data}: any ) => {

        let e: PeriodicElement[] = [];

          data.course.forEach((element, index) => {
            e.push({
                id: index + 1,
                courseNo: element.id,
                courceName: element.courceName.name,
                beneficiaryType: element.beneficiaryType.companyType,
                level: element.level.name,
                startTime: new Date (new Date().toDateString() + ' ' + element.start_time),
                catagory: element.catagory.name,
                coache: element.coache.name,
                typePlace: element.typePlace.name,
                hours: element.hours,
                days: element.days,
                status: element.status,
                organisationName: 'مدارس الطموح',
                courcesDates: '2020/01/01',
                // trainingPlace: element.trainingPlace,
                test1: element.test_1,
                test2: element.test_2,
                oralTest: element.oral_test,
                writtenTest: element.written_test,
                certificateName1: element.certificate1.certificatename,
                certificateName2: element.certificate2.certificatename,
                certificateName3: element.certificate3.certificatename,
                updatedAt: element.updatedAt,
                createdAt: element.createdAt,
              })
            });
          
          this.dataSource = new MatTableDataSource(e);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        }) 

      this.ngxSpinnerService.hide()
    
    })
        

      

  } 





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }





  addNewCourse(){
    this.dialog.open(DialogAddNewCourse,{
      disableClose: true,
      width: '100vw',
      maxWidth: '100vw',
      data: {userID: this.userID}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    });
  }


  edit(id, type){}


  afterClosed: Subscription;
  formSettings(data, type) {

    // switch (type) {

    //   case 'edit':
    //     this.afterClosed = this.dialog.open(CertificateFormComponent,{
    //       disableClose: true,
    //       width: '100vw',
    //       maxWidth: '100vw',
    //       data: {uID: this.userID, cerID: data.rowID, cerPositionType: data.cerPositionType, certificateName: data.certificateName, cerPosition: data.cerPosition}
    //     }).afterClosed().subscribe(result => {
         
    //     // this.router.navigate([this.router.url]); 
    //     // window.location.reload()

    //     })
    //     break;
    
    //   case 'view':
    //   this.afterClosed = this.dialog.open(CertificateViewComponent,{
    //       disableClose: true,
    //       width: '100vw',
    //       maxWidth: '100vw',
    //       data: {uID: this.userID, cerID: data.rowID, cerPositionType: data.cerPositionType, certificateName: data.certificateName, cerPosition: data.cerPosition}
    //     }).afterClosed().subscribe(result => {})
    //     break;
    // }
 
  }
}






/**-------------------------------------------------------------------- */ 
/**-------------------------------------------------------------------- */ 
/**-------------------------------------------------------------------- */ 


import { loadCldr, L10n, setCulture} from '@syncfusion/ej2-base';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

import { default as numberingSystems } from "cldr-data/supplemental/numberingSystems.json";
import { default as gregorian } from "cldr-data/main/ar/ca-gregorian.json";
import { default as numbers } from "cldr-data/main/ar/numbers.json";
import { default as timeZoneNames } from "cldr-data/main/ar/timeZoneNames.json";
import { default as weekData } from "cldr-data/supplemental/weekData.json"; // To load the culture based first day of week
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

// loadCldr(
//   require('cldr-data/supplemental/numberingSystems.json'),
//   require('cldr-data/main/ar/ca-gregorian.json'),
//   require('cldr-data/main/ar/numbers.json'),
//   require('cldr-data/main/ar/timeZoneNames.json'),
//   require('cldr-data/supplemental/weekData.json')); // To load the culture based first day of week


loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

@Component({
  selector: 'dialog-add-certificate',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>إنشاء نموذج جديد</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>


  
 <!-- <app-native-datetime></app-native-datetime> -->
<!-- <app-moment-datetime></app-moment-datetime> -->




    <mat-dialog-content id="form-element" class="form-vertical" [formGroup]="form" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>









           
    
    <!-- 
  <ejs-calendar [firstDayOfWeek]='2' [values]='dateValusesDate' locale='ar' (change)='onChange($event)' [isMultiSelection]='true' enableRtl='true'></ejs-calendar>
<ejs-timepicker enableRtl='true' locale='ar' [value]='dateValueTime' [min]='minValueTime' [max]='maxValueTime' [strictMode]='isStrictModeTime'></ejs-timepicker>
<ejs-datetimepicker enableRtl='true' locale='ar' [value]='dateTime' [min]='minDateTime' [max]='maxDateTime'></ejs-datetimepicker>
<ejs-datepicker enableRtl='true' locale='ar' id="datepicker" [min]='minDate' [max]='maxDate'></ejs-datepicker>

<div *ngIf="onChangeValuesDate.length > 0; else ngDates">
  <h2 *ngFor="let val of onChangeValuesDate; index as i">
      {{order(i+1)}}: {{val | date:'EEEE, d/M/y'}}
  </h2>
</div>
<<ng-template #ngDates>
  لم يتم اختيار التاريخ!!
</ng-template>
<br>
<h3>{{onChangeValuesDate}}</h3>
  
  
   -->
    

<!--
    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
      <mat-form-field  fxFlex="auto" appearance="fill">
      <mat-label>Choose a date</mat-label>
      <input type="time" matInput [matDatepicker]="picker">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      
      <mat-form-field  fxFlex="auto" appearance="fill">
      <mat-label>Choose a date</mat-label>
      <input type="date" matInput [matDatepicker]="picker">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field  fxFlex="auto" appearance="fill">
      <mat-label>Choose a date</mat-label>
      <input type="datetime-local" matInput [matDatepicker]="picker">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field  fxFlex="auto" appearance="fill">
      <mat-label>Choose a date</mat-label>
      <input type="datetime" matInput [matDatepicker]="picker">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

  
    </div>
<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

    <mat-form-field fxFlex="auto">
    <mat-label>الوقت</mat-label>
    <mat-datetimepicker-toggle [for]="timePicker" matSuffix></mat-datetimepicker-toggle>
    <mat-datetimepicker #timePicker type="time" openOnFocus="true" timeInterval="5"></mat-datetimepicker>
    <input matInput formControlName="time" [matDatetimepicker]="timePicker" required>
    <mat-error *ngIf="form.get('time').errors?.required">حقل مطلوب</mat-error>
  </mat-form-field>

  <mat-form-field fxFlex="auto">
    <mat-label>الوقت والتاريخ</mat-label>
    <mat-datetimepicker-toggle [for]="datetimePicker" matSuffix></mat-datetimepicker-toggle>
    <mat-datetimepicker #datetimePicker type="datetime" startView="month" openOnFocus="true" timeInterval="5"></mat-datetimepicker>
    <input matInput formControlName="dateTime" [matDatetimepicker]="datetimePicker" required>
    <mat-error *ngIf="form.get('dateTime').errors?.required">حقل مطلوب</mat-error>
  </mat-form-field>
    </div> 
   <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
  <mat-form-field fxFlex="auto">
    <mat-label>التاريخ</mat-label>
    <mat-datetimepicker-toggle [for]="datePicker" matSuffix></mat-datetimepicker-toggle>
    <mat-datetimepicker #datePicker type="date" openOnFocus="true"></mat-datetimepicker>
    <input matInput formControlName="date" [matDatetimepicker]="datePicker" required>
    <mat-error *ngIf="form.get('date').errors?.required">حقل مطلوب</mat-error>
  </mat-form-field>

    </div> -->

    <mat-accordion>

<mat-expansion-panel (opened)="panelOpenState = true"
                     (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
    <mat-panel-title>اختر ايام الدورة:</mat-panel-title>
    <mat-panel-description> عدد أيام الدورة:&nbsp;<p style="color: red">{{dateValusesDate?.length > 0? dateValusesDate?.length:'لم يتم الاختيار!'}}</p></mat-panel-description>
  </mat-expansion-panel-header>

    <mat-grid-list cols="2" rowHeight="20rem">
      <mat-grid-tile>
        <ejs-calendar #ejCalendar (created)='onCreate()' [firstDayOfWeek]='2' [values]='dateValusesDate' locale='ar' (change)='onChange($event)' [isMultiSelection]='true' enableRtl='true'></ejs-calendar>
      </mat-grid-tile>
      <mat-grid-tile>
        <div class="ex1" *ngIf="dateValusesDate?.length > 0; else ngDates">
          <h4 *ngFor="let val of dateValusesDate; index as i">
              <b>{{order(i+1)}}</b>: {{val | date:'EEEE, d/M/y'}}
          </h4>
        </div>
        <ng-template #ngDates>
          <p style="color: red">لم يتم اختيار التاريخ!!</p>
        </ng-template>
        </mat-grid-tile>
      </mat-grid-list>
  </mat-expansion-panel>
  
</mat-accordion>
<br>
<div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

    <mat-form-field fxFlex="auto">
        <mat-label>الفئة</mat-label>
        <mat-select formControlName="catagory">
          <mat-option dir="rtl" required *ngFor="let data of catagory" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المستوى</mat-label>
        <mat-select formControlName="level">
          <mat-option dir="rtl" required *ngFor="let data of level" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>عدد الساعات</mat-label>
        <input type="number" matInput formControlName="hours" required>
      </mat-form-field>

    </div>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <ejs-timepicker id='startTime' formControlName="startTime" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="وقت بدء الدورة" enableRtl='true' locale='ar'></ejs-timepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>المقر</mat-label>
        <mat-select formControlName="typePlace">
          <mat-option dir="rtl" required *ngFor="let data of typePlace" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

  </div>





  <mat-list>
      <mat-list-item><b>بيانات الجهة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

  <mat-form-field fxFlex="auto">
        <mat-label>اسم المدرب</mat-label>
        <mat-select formControlName="coache">
          <mat-option dir="rtl" required *ngFor="let data of coache" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>نوع المستفيد</mat-label>
        <mat-select formControlName="beneficiaryType">
          <mat-option (click)="data.companyType == 'جهات'? show=true : show=false" dir="rtl" disabled="false"  required *ngFor="let data of beneficiaryType" selected="6" [value]="data.id">{{data.companyType}}</mat-option>
        </mat-select>
      </mat-form-field>
      </div>



      <div *ngIf="show" fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>اختر الجهة المستفيدة</mat-label>
        <mat-select formControlName="companyProfiles">
          <mat-option (click)="getCoordinator(data.id)" dir="rtl" disabled="false"  required *ngFor="let data of companyProfiles" selected="6" [value]="data.id">{{data.companyName}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
      <mat-label>اختر اسم المنسق</mat-label>
        <mat-select formControlName="coordinator">
          <mat-option dir="rtl" disabled="false"  required *ngFor="let data of coordinator" selected="6" [value]="data._01_personal.id">{{data._01_personal.name_AR}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>اكتب اسم القاعة</mat-label>
        <input formControlName="trainingPlace" required matInput type="text">
      </mat-form-field>


  </div>

    <mat-list>
        <mat-list-item><b>مواعيد الاختبارات</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
      <ejs-datetimepicker id='test1' formControlName="test1" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار الاول" enableRtl='true' locale='ar'></ejs-datetimepicker>
      <ejs-datetimepicker id='test2' formControlName="test2" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار الثاني" enableRtl='true' locale='ar'></ejs-datetimepicker>
      <ejs-datetimepicker id='oralTest' formControlName="oralTest" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار الشفوي" enableRtl='true' locale='ar'></ejs-datetimepicker>
      <ejs-datetimepicker id='writtenTest' formControlName="writtenTest" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار التحريري" enableRtl='true' locale='ar'></ejs-datetimepicker>
    </div>
    <br>


    <mat-list>
      <mat-list-item><b>اختيار النماذج</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج الشهادة</mat-label>
      <mat-select formControlName="certificateModels1">
        <mat-option dir="rtl" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار إعادة الاختبار</mat-label>
      <mat-select formControlName="certificateModels2">
        <mat-option dir="rtl" [disabled]="'false'" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار عدم الاجتياز</mat-label>
      <mat-select formControlName="certificateModels3">
        <mat-option dir="rtl" [disabled]="'false'" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
    </mat-form-field>

  </div>

  <!-- <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
    <mat-form-field fxFlex="auto">
      <mat-label>إسم المستند</mat-label>
        <md-input-container>
          <input type="text" formControlName="certificateName" matInput required>
        </md-input-container>
      <mat-icon matSuffix [icIcon]="icSmartDocument"></mat-icon>
    </mat-form-field>
  </div> 

   <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

    <mat-form-field fxFlex="auto">
      <mat-label>التصنيف</mat-label>
      <mat-select formControlName="category">
        <mat-option dir="rtl" required *ngFor="let data of category" value="{{data.id}}">{{data.name}}</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
    <mat-label>النوع</mat-label>
    <mat-select formControlName="langSex">
      <mat-option dir="rtl" [disabled]="'false'" required *ngFor="let data of langSex" value="{{data.id}}">{{data.name}}</mat-option>
    </mat-select>
  </mat-form-field>

  </div>

  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

  <mat-form-field fxFlex="auto">
    <mat-label>وضعية المستند</mat-label>
    <mat-select formControlName="cerPosition">
      <mat-option dir="rtl" required *ngFor="let data of cerPosition" value="{{data.id}}">{{data.name}}</mat-option>
    </mat-select>
  </mat-form-field>

</div>  -->

</mat-dialog-content>

<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
  <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>حفظ</button>
  <button mat-raised-button (click)="form.reset()">مسح</button>
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss']
})


export class DialogAddNewCourse implements OnInit {
  show = false;
  panelOpenState = false;
  formObject: FormValidator;
  options: FormValidatorModel = {
    rules: {
        'test1': {
            required: [true, "حقل الاختبار الأول مطلوب"]
        },
        'test2': {
          required: [true, "حقل الاختبار الثاني مطلوب"]
        },
        'oralTest': {
          required: [true, "حقل الاختبار  الشفوي مطلوب"]
        },
        'writtenTest': {
          required: [true, "حقل الاختبار التحريري مطلوب"]
        },
        'startTime': {
          required: [true, "حقل وقت البدء مطلوب"]
        }
    },
    customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        inputElement.parentElement.parentElement.appendChild(errorElement);
    }
};

@ViewChild('ejCalendar') ejCalendar: CalendarComponent;

onCreate() {
  let clearBtn: HTMLElement = document.createElement('button');
  let footerElement: any = document.getElementsByClassName('e-footer-container')[0];
  //creates the custom element for clear button
  clearBtn.className = 'e-btn e-clear e-flat';
  clearBtn.textContent = 'مسح';
  footerElement.prepend(clearBtn);
  this.ejCalendar.element.appendChild(footerElement);
  let proxy = this;
  // custom click handler to update the value property with null values.
  document.querySelector('.e-footer-container .e-clear').addEventListener('click', function() {
      proxy.ejCalendar.values = null;
  })
}

public onFocusOut(): void {
  this.formObject.validate("test1");
  this.formObject.validate("test2");
  this.formObject.validate("oralTest");
  this.formObject.validate("writtenTest");
  this.formObject.validate("startTime");
}
  icClose = icClose
  icSmartDocument = icSmartDocument;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  
   // Time
   public dateValueTime: Date = new Date('8/3/2017 10:00 AM');
   public minValueTime: Date = new Date('8/3/2017 9:00 AM');
   public maxValueTime: Date = new Date('8/3/2017 11:30 AM');
   public isStrictModeTime: boolean = true;
 
 
 
   // Date Time
   public dateTime: Date = new Date("5/25/2017 4:00 PM");
   public minDateTime: Date = new Date("5/5/2017 2:00 PM");
   public maxDateTime: Date = new Date("5/25/2017 3:00 PM");
 
 
   // Date
   public month: number = new Date().getMonth();
   public fullYear: number = new Date().getFullYear();
   public minDate: Date = new Date(this.fullYear, this.month , 7);
   public maxDate: Date = new Date(this.fullYear, this.month, 27);
 
 
   // multiSelect
  //  public dateValusesDate: Date[] = [new Date(), new Date('1/15/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
   public multiSelect: Boolean = true;
 
   public monthDate: number = new Date().getMonth();
   public fullYearDate: number = new Date().getFullYear();
   public dateDate: number = new Date().getDate();
 
   public minValueDate: Date = new Date(this.fullYearDate, this.monthDate, this.dateDate, 7, 0, 0);
   public maxValueDate: Date = new Date(this.fullYearDate, this.monthDate, this.dateDate, 16, 0 ,0);
 
   public dateValusesDate: Date[] = [];

   onChange($event){
    this.dateValusesDate = $event.values;
  }

  order(number: any): string{
    switch (number) {
      case 1:
        return "اليوم الأول"
        break;

      case 2:
        return "اليوم الثاني"
        break;
      
      case 3:
        return "اليوم الثالث"
        break;
                
      case 4:
        return "اليوم الرابع"
        break;
                  
      case 5:
        return "اليوم الخامس"
        break;
                  
      case 6:
        return "اليوم السادس"
        break;
                  
      case 7:
        return "اليوم السابع"
        break;
                  
      case 8:
        return "اليوم الثامن"
        break;
                  
      case 9:
        return "اليوم التاسع"
        break;
                  
      case 10:
        return "اليوم العاشر"
        break;

      default:
        return "تجاوز الحد"
        break;
    }
  }


  
  form = this.fb.group({
    beneficiaryType:  new FormControl(null, [Validators.required]),
    level:  new FormControl(null, [Validators.required]),
    hours:  new FormControl(null, [Validators.required]),
    catagory:  new FormControl(null, [Validators.required]),
    coache:  new FormControl(null, [Validators.required]),
    typePlace:  new FormControl(null, [Validators.required]),
    certificateModels1:  new FormControl(null, [Validators.required]),
    certificateModels2:  new FormControl(null, [Validators.required]),
    certificateModels3:  new FormControl(null, [Validators.required]),
    companyProfiles:  new FormControl(null, [Validators.required]),
    coordinator:  new FormControl(null, [Validators.required]),
    trainingPlace:  new FormControl(null, [Validators.required]),
    startTime:  new FormControl(null, [Validators.required]),
    test1:  new FormControl(null, [Validators.required]),
    test2:  new FormControl(null, [Validators.required]),
    oralTest:  new FormControl(null, [Validators.required]),
    writtenTest:  new FormControl(null, [Validators.required])

    // organisationName:  new FormControl(null, [Validators.required]),
    // startTime:  new FormControl(null, [Validators.required]),
    // trainingPlace: new FormControl( null, [Validators.required]),
    // hours:  new FormControl(null, [Validators.required, Validators.pattern(patternsNumber)]),
    // days:  new FormControl(null, [Validators.required, Validators.pattern(patternsNumber)]),
    // test1:  new FormControl(null, [Validators.required]),
    // test2:  new FormControl(null, [Validators.required]),
    // oralTest:  new FormControl(null, [Validators.required]),
    // writtenTest:  new FormControl(null, [Validators.required]),
    // courcesDates:  new FormControl(null, [Validators.required]),
  });


  courceName: any;
  beneficiaryType: any;
  level: any;
  catagory: any;
  coache: any;
  typePlace: any;
  certificateModels: any;
  companyProfiles: any;
  coordinator: any;




constructor(
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }


  ngOnInit(){

    this.dateValusesDate = [new Date('8/7/2020'), new Date('8/8/2020'), new Date('8/9/2020')];

    this.formObject = new FormValidator('#form-element', this.options);
    //  setCulture("ar");
    L10n.load({
      'ar': {
      'calendar': {
      today:"اليوم"
      }
      }
      });
  
      L10n.load({
      'ar': {
      'datetimepicker': {
      placeholder:"اختر التاريخ والوقت",
      today:"اليوم"
      }
      }
      });
  
      L10n.load({
      'ar': {
      'timepicker': {
      placeholder:"اختر الوقت"
      }
      }
      });
  
      L10n.load({
      'ar': {
      'datepicker': {
      placeholder:"اختر التاريخ",
      today:"اليوم"
      }
      }
      });
      
  this.apollo.watchQuery({
    query: gql`
        query mexCourseTables{
        mexCourseTables{
          courceName{
            id
            name
          }
          beneficiaryType{
            id
            companyType
          }
          level{
            id
            name
          }
          catagory{
            id
            name
          }
          coache{
            id
            name
          }
          typePlace{
            id
            name
          }
          certificateModels{
            id
            certificatename
          }
          companyProfiles{
            id
            companyName
          }
        }
      }
      `
  }).valueChanges.subscribe(( {data}: any ) => {

    this.courceName = data.mexCourseTables.courceName.filter((value, index, array)=>{
     return parseInt(value.id) == 5 || parseInt(value.id) == 6
    })

    this.beneficiaryType = data.mexCourseTables.beneficiaryType.filter((value, index, array)=>{
      return parseInt(value.id) == 7 || parseInt(value.id) == 3
     })

    this.level = data.mexCourseTables.level.filter((value, index, array)=>{
      return parseInt(value.id) == 1 || parseInt(value.id) == 3
     })

     
    this.catagory = data.mexCourseTables.catagory
    this.coache = data.mexCourseTables.coache
    this.typePlace = data.mexCourseTables.typePlace
    this.certificateModels = data.mexCourseTables.certificateModels
    this.companyProfiles = data.mexCourseTables.companyProfiles


    this.form = this.fb.group({
      beneficiaryType:  new FormControl(null, [Validators.required]),
      level:  new FormControl(null, [Validators.required]),
      hours:  new FormControl(null, [Validators.required]),
      catagory:  new FormControl(null, [Validators.required]),
      coache:  new FormControl(null, [Validators.required]),
      typePlace:  new FormControl(null, [Validators.required]),
      certificateModels1:  new FormControl(null, [Validators.required]),
      certificateModels2:  new FormControl(null, [Validators.required]),
      certificateModels3:  new FormControl(null, [Validators.required]),
      companyProfiles:  new FormControl(null, [Validators.required]),
      coordinator:  new FormControl(null, [Validators.required]),

      trainingPlace:  new FormControl(null, [Validators.required]),
      startTime: [null, Validators.required],
      test1:  new FormControl(null, [Validators.required]),
      test2:  new FormControl(null, [Validators.required]),
      oralTest:  new FormControl(null, [Validators.required]),
      writtenTest:  new FormControl(null, [Validators.required])

      // organisationName:  new FormControl(null, [Validators.required]),
      // startTime:  new FormControl(null, [Validators.required]),
      // trainingPlace: new FormControl( null, [Validators.required]),
      // hours:  new FormControl(null, [Validators.required, Validators.pattern(patternsNumber)]),
      // days:  new FormControl(null, [Validators.required, Validators.pattern(patternsNumber)]),
      // test1:  new FormControl(null, [Validators.required]),
      // test2:  new FormControl(null, [Validators.required]),
      // oralTest:  new FormControl(null, [Validators.required]),
      // writtenTest:  new FormControl(null, [Validators.required]),
      // courcesDates:  new FormControl(null, [Validators.required]),
    });

    this.ngxSpinnerService.hide()

})




  }


  getCoordinator(id){
    this.ngxSpinnerService.show()

    this.apollo.watchQuery({
      query: gql`
          query coordinator($companyprofile_id: ID!){
            coordinator(companyprofile_id: $companyprofile_id){
              _01_personal{
                id
                name_AR
              }
            }
        }
        `,
        variables: {
          companyprofile_id: id
        }
    }).valueChanges.subscribe(( {data}: any ) => {
      this.coordinator = data.coordinator
    })
  



    this.ngxSpinnerService.hide()

  }


  savaData(){

    console.log(this.form.invalid)

    // console.log('uID', parseInt(this.data.userID))
    // console.log('courseName', parseInt(this.form.get('catagory').value == null? null: this.form.get('catagory').value == '1'? '5':'6'))
    console.log('courcesDates',  this.dateValusesDate)

    // console.log('catagory',  parseInt(this.form.get('catagory').value))
    // console.log('level',  parseInt(this.form.get('level').value))
    // console.log('hours',  parseInt(this.form.get('hours').value))
    // console.log('startTime',  this.form.get('startTime').value)
    // console.log('trainingPlace',  this.form.get('trainingPlace').value)
    // console.log('coache',  parseInt(this.form.get('coache').value))
    // console.log('beneficiaryType', parseInt(this.form.get('beneficiaryType').value))
    // console.log('companyProfiles',  parseInt(this.form.get('companyProfiles').value))
    // console.log('coordinator',  parseInt(this.form.get('coordinator').value))
    // console.log('typePlace',  parseInt(this.form.get('typePlace').value))
    // console.log('test1',  this.form.get('test1').value)
    // console.log('test2',  this.form.get('test2').value)
    // console.log('oralTest',  this.form.get('oralTest').value)
    // console.log('writtenTest',  this.form.get('writtenTest').value)
    // console.log('certificateModels1',  parseInt(this.form.get('certificateModels1').value))
    // console.log('certificateModels2',  parseInt(this.form.get('certificateModels2').value))
    // console.log('certificateModels3',  parseInt(this.form.get('certificateModels3').value))


 if(this.form.invalid) return
    this.ngxSpinnerService.show()
    


      //   this.apollo.mutate({
      //     mutation: gql`
      //       mutation createCertificate($uID: Int! $certificatename: String $lang_sex_ID: Int $certificatecatagory_ID: Int $cer_position_ID: Int $certificatesDetails: String!){
      //         createCertificate(uID: $uID certificatename: $certificatename lang_sex_ID: $lang_sex_ID certificatecatagory_ID: $certificatecatagory_ID cer_position_ID: $cer_position_ID certificatesDetails: $certificatesDetails){
      //             id    
      //         }
      //       }
      //       `,
      //       variables:{
      //         uID: parseInt(this.data.us erID),
              // courceName:  parseInt(this.form.get('sex').value == '1'? '5':'6'),
              // beneficiaryType:  parseInt(this.form.get('beneficiaryType').value),
              // level:  parseInt(this.form.get('level').value),
              // sex:  parseInt(this.form.get('sex').value),
              // coache:  parseInt(this.form.get('coache').value),
              // typePlace:  parseInt(this.form.get('typePlace').value),
              // certificateModels1:  parseInt(this.form.get('certificateModels1').value),
              // certificateModels2:  parseInt(this.form.get('certificateModels2').value),
              // certificateModels3:  parseInt(this.form.get('certificateModels3').value),

      //       }
      //   }).subscribe(( {data}: any ) => {
    
      //   this.dialogRef.close(true);
      //   this.ngxSpinnerService.hide()
    
      //   this.snackBar.open('تمت إضافة البرنامج بنجاح','إغلاق', {
      //     duration: 6000,
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //   });
    
      // })
      this.ngxSpinnerService.hide()

    }
}