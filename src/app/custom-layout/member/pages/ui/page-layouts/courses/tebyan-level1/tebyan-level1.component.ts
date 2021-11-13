import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icEye from '@iconify/icons-ic/remove-red-eye';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icLink from '@iconify/icons-ic/twotone-link';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFocus from '@iconify/icons-ic/center-focus-strong';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icModule from '@iconify/icons-ic/view-module';
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
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDataFormDialog } from '../../../../apps/social/social-profile/social-profile.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';

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
  displayedColumns: string[] = ['id', 'courseNo', 'level', 'catagory', 'beneficiaryType', 'courceDate', 'startTime', 'typePlace', 'coache', 'view','link', 'edit2', 'edit','status', 'updatedAt', 'createdAt'];
  dataSource: any
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  icLink = icLink;
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icEye = icEye
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icFocus = icFocus;
  icSettings = icSettings 
  icPrint = icPrint
  icModule = icModule
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
              start_time
              courcesDates
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
            }
          }
          `,
          variables: {
            uID: data.currentUser.id
          }
      }).valueChanges.subscribe(({data}: any ) => {

        let e: any[] = [];
        

        data.course.forEach((element, index) => {
            e.push({
                id: index + 1,
                courseNo: element.id,
                courceName: element.courceName.name,
                courceDate: JSON.parse(element.courcesDates)[0],
                courcesDates: JSON.parse(element.courcesDates),
                beneficiaryType: element.beneficiaryType.companyType,
                level: element.level.name,
                startTime: element.start_time,
                catagory: element.catagory.name,
                coache: element.coache.name,
                typePlace: element.typePlace.name,
                status: element.status,
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
      // width: '100vw',
      // maxWidth: '100vw',
      data: {userID: this.userID}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    });
  }

  editCourse(courseNo){
    this.dialog.open(DialogEditCourse,{
      disableClose: true,
      // width: '100vw',
      // maxWidth: '100vw',
      data: {userID: this.userID, courseNo}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    });
  }

  deleteCourse(courseNo){
    
    this.dialog.open(ConformDialogComponent,{
      disableClose: false,
      width: '300px',
      data: {hint: 'حذف', message: 'هل تريد حذف النموذج؟'}
    }).afterClosed().subscribe(result => {

      if(!JSON.parse(result)) return

          this.ngxSpinnerService.show()

          this.apollo.mutate({
            mutation: gql`
              mutation deleteCourse($id: ID!){
                deleteCourse(id: $id)
              }
              `,
              variables:{
                id: parseInt(courseNo)
              }
          }).subscribe(( {data}: any ) => {
            this.ngOnInit()
          this.ngxSpinnerService.hide()
            
          this.snackBar.open(data.deleteCourse,'إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      
        })
    }); 

  }

  
  viewCourse(courseNo){
    
    this.dialog.open(DialogViewCourse,{
      disableClose: true,
      width: '80vw',
      maxWidth: '80vw',
      data: {userID: this.userID, courseNo}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    });

  }

  linkCourse(courseNo){

    this.dialog.open(DialogLinkCourse,{
      disableClose: true,
      width: '50vw',
      maxWidth: '50vw',
      data: {userID: this.userID, courseNo}
    }).afterClosed().subscribe(result => {
      if(result) this.ngOnInit()
    });

  }

  manageCourse(courcesDates, courseNo, level){

    this.dialog.open(ManageCourseComponent,{
      disableClose: true,
      width: '100vw',
      maxWidth: '100vw',
      data: {userID: this.userID, courseNo, courcesDates, level: level == 'المستوى الأول'? 1 : 3}
    }).afterClosed().subscribe(result => {
      if(result) this.ngOnInit()
    });

  }

  checkeStatus(status, courseNo){

    this.ngxSpinnerService.show()
    

    this.apollo.mutate({
      mutation: gql`
        mutation updateCourse($id: Int! $status: Boolean){
          updateCourse(id: $id status: $status)
        }
        `,
        variables:{
          id: parseInt(courseNo),
          status: !status,      
        }
    }).subscribe(( {data}: any ) => {

    this.ngxSpinnerService.hide()

  })


  this.ngxSpinnerService.hide()

  }

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






/**-----------------------------------add new course--------------------------------- */ 
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
import { MaskedDateTimeService } from '@syncfusion/ej2-angular-calendars';
import { ConformDialogComponent } from 'src/app/custom-layout/member/layout/dialogs/conformDialog/conform.dialog.component';
import { ComponentsOverviewListsModule } from 'src/app/custom-layout/admin/pages/ui/components/components-overview/components/components-overview-lists/components-overview-lists.module';

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


    <mat-dialog-content id="form-element" class="form-vertical" [formGroup]="form" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>


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
        <mat-error *ngIf="form.get('catagory').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المستوى</mat-label>
        <mat-select formControlName="level">
          <mat-option dir="rtl" required *ngFor="let data of level" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('level').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <!-- <mat-form-field fxFlex="auto">
        <mat-label>عدد الساعات</mat-label>
        <input type="number"  matInput formControlName="hours" required>
        <mat-error *ngIf="form.get('hours').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field> -->
    </div>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <ejs-timepicker  id='startTime' formControlName="startTime" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="وقت بدء الدورة" enableRtl='true' locale='ar'></ejs-timepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>المقر</mat-label>
        <mat-select formControlName="typePlace">
          <mat-option dir="rtl" required *ngFor="let data of typePlace" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('typePlace').errors?.required">حقل مطلوب</mat-error>
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
        <mat-error *ngIf="form.get('typePlace').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>نوع المستفيد</mat-label>
        <mat-select formControlName="beneficiaryType">
          <mat-option (click)="dataSource = []; resetInputs(data.id); data.companyType == 'أفراد | جهات (مشترك)'? show=true : data.companyType == 'جهة | جهات'? show=true : show=false" dir="rtl"  required *ngFor="let data of beneficiaryType" [value]="data.id">{{data.companyType}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('beneficiaryType').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
      </div>



      <div *ngIf="show">

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>اختر الجهة المستفيدة</mat-label>
        <mat-select formControlName="companyProfiles">
          <mat-option (click)="getCoordinator(data.id)" dir="rtl"  required *ngFor="let data of companyProfiles" [value]="data.id">{{data.companyName}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('companyProfiles').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
      <mat-label>اختر اسم المنسق</mat-label>
        <mat-select formControlName="coordinator">
          <mat-option (click)="companyCoordinator(form.get('coordinator').value, form.get('companyProfiles').value)" dir="rtl"  required *ngFor="let data of coordinator" [value]="data._01_personal.id">{{data._01_personal.name_AR}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('coordinator').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>اكتب اسم القاعة</mat-label>
        <input formControlName="trainingPlace" matInput type="text">
        <mat-error *ngIf="form.get('trainingPlace').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
  </div>

      <mat-list>
          <mat-list-item><b>الجهات المختارة</b></mat-list-item>
        <mat-divider></mat-divider>
      </mat-list>

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <!--- Note that these columns can be defined in any order.
                  The actual rendered columns are set as a property on the row definition" -->


            <!-- companyName Column -->
            <ng-container matColumnDef="companyName">
              <th mat-header-cell *matHeaderCellDef> اسم الجهة </th>
              <td mat-cell *matCellDef="let element"> {{element.companyName}} </td>
            </ng-container>

            <!-- Coordinator Column -->
            <ng-container matColumnDef="coordinatorName">
              <th mat-header-cell *matHeaderCellDef> اسم المنسق </th>
              <td mat-cell *matCellDef="let element"> {{element.coordinatorName}} </td>
            </ng-container>

            <!-- Case Column -->
            <ng-container matColumnDef="case">
              <th mat-header-cell *matHeaderCellDef> الإجراء </th>
              <td mat-cell *matCellDef="let element"> 
                  <a (click)="deleteCourse(element.case)"
                      class="w-8 h-8 leading-none flex items-center justify-center hover:bg-hover text-primary bg-primary-light"
                      mat-icon-button>
                    <mat-icon [icIcon]="icDelete" color="warn" size="22px"></mat-icon>
                  </a>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div>

  </div>

    <br>
    <br>

    <mat-list>
        <mat-list-item><b>مواعيد الاختبارات</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
      <ejs-datetimepicker id='test1' formControlName="test1" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار القصير الأول" enableRtl='true' locale='ar'></ejs-datetimepicker>
      <ejs-datetimepicker id='test2' formControlName="test2" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار القصير الثاني" enableRtl='true' locale='ar'></ejs-datetimepicker>
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
      <mat-error *ngIf="form.get('certificateModels1').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار إعادة الاختبار</mat-label>
      <mat-select formControlName="certificateModels2">
        <mat-option dir="rtl" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
      <mat-error *ngIf="form.get('certificateModels2').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار عدم الاجتياز</mat-label>
      <mat-select formControlName="certificateModels3">
        <mat-option dir="rtl" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
      <mat-error *ngIf="form.get('certificateModels3').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

  </div>


</mat-dialog-content>

<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
  <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>حفظ</button>
  <!-- <button mat-raised-button (click)="form.reset(); coordinator = null">مسح</button> -->
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss'],
  providers: [MaskedDateTimeService]
})


export class DialogAddNewCourse implements OnInit {
  displayedColumns: string[] = ['companyName', 'coordinatorName', 'case'];
  dataSource: any[]= []

  companyCoordinator(coordinator, companyProfiles){

  const coordinaANDcompanyVar = []


    const coordinaVar = this.coordinator.filter((value, index, array)=>{
      return (value._01_personal.id == coordinator)? value._01_personal : null
    })

    const companyVar = this.companyProfiles.filter((value, index, array)=>{
      return (value.id == companyProfiles)? value : null
    })


    if(!Array.isArray(this.dataSource) || !this.dataSource.length){
        coordinaANDcompanyVar.push({coordinar: {name_AR: coordinaVar[0]._01_personal.name_AR, id: coordinaVar[0]._01_personal.id}, company: {companyName: companyVar[0].companyName, id: companyVar[0].id}})
      } else {

          if(!this.dataSource.some(item => item.companyId === companyProfiles)){
            coordinaANDcompanyVar.push({coordinar: {name_AR: coordinaVar[0]._01_personal.name_AR, id: coordinaVar[0]._01_personal.id}, company: {companyName: companyVar[0].companyName, id: companyVar[0].id}})
          } 

    }


    for (let index = 0; index < coordinaANDcompanyVar.length; index++) {
      const element = coordinaANDcompanyVar[index];
      
      this.dataSource.push({companyName: element.company.companyName, companyId: element.company.id, coordinatorName: element.coordinar.name_AR, coordinatorId: element.coordinar.id})

    }

    this.dataSource = [...this.dataSource]

  }

  deleteCourse(indexId: number){
    
    this.dataSource.splice(indexId,1);
    this.dataSource = [...this.dataSource]

  }

  show = false;
  icDelete = icDelete
  //public enableMaskSupport: boolean = true; // [enableMask]="enableMaskSupport" 
  panelOpenState = false;
  formObject: FormValidator;
  options: FormValidatorModel = {
    rules: {
        'test1': {
            required: [true, "حقل الاختبار القصير الأول مطلوب"]
        },
        'test2': {
          required: [true, "حقل الاختبار القصير الثاني مطلوب"]
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

    // this.dateValusesDate = [new Date('8/7/2020'), new Date('8/8/2020'), new Date('8/9/2020')];

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
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة',
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'timepicker': {
      placeholder:"اختر الوقت",
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'datepicker': {
      placeholder:"اختر التاريخ",
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة'
      }
      }
      });
      
  this.apollo.watchQuery({
    query: gql`
        query coursesLinkRejecter{
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
      return parseInt(value.id) == 7 || parseInt(value.id) == 3 || parseInt(value.id) == 8
     })

    this.level = data.mexCourseTables.level.filter((value, index, array)=>{
      return parseInt(value.id) == 1 || parseInt(value.id) == 3 || parseInt(value.id) == 7 || parseInt(value.id) == 8
     })

    this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
      return parseInt(value.id) == 1 || parseInt(value.id) == 2
     })

     
    this.coache = data.mexCourseTables.coache
    this.typePlace = data.mexCourseTables.typePlace
    this.certificateModels = data.mexCourseTables.certificateModels
    this.companyProfiles = data.mexCourseTables.companyProfiles



    this.form = this.fb.group({
      beneficiaryType:  new FormControl(null, [Validators.required]),
      level:  new FormControl(null, [Validators.required]),
      hours:  new FormControl({value: 15, disabled: true}, [Validators.required]),
      catagory:  new FormControl(null, [Validators.required]),
      coache:  new FormControl(null, [Validators.required]),
      typePlace:  new FormControl(null, [Validators.required]),
      certificateModels1:  new FormControl(null, [Validators.required]),
      certificateModels2:  new FormControl(null, [Validators.required]),
      certificateModels3:  new FormControl(null, [Validators.required]),

      companyProfiles:  new FormControl(null),
      coordinator:  new FormControl(null),
      trainingPlace:  new FormControl(null),


      startTime: [null, Validators.required],
      test1:  new FormControl(null, [Validators.required]),
      test2:  new FormControl(null, [Validators.required]),
      oralTest:  new FormControl(null, [Validators.required]),
      writtenTest:  new FormControl(null, [Validators.required])
    });



    this.ngxSpinnerService.hide()

})




  }

resetInputs(id){

  switch (id) {
    case '3':

    // this.form.get('companyProfiles').setValidators(Validators.required)
    // this.form.get('coordinator').setValidators(Validators.required)
    this.form.get('trainingPlace').setValidators(Validators.required)

      break;

    case '7':


      this.form.get('companyProfiles').reset()
      this.form.get('coordinator').reset()
      this.form.get('trainingPlace').reset()
    

      this.form.controls['companyProfiles'].setErrors(null)
      this.form.controls['coordinator'].setErrors(null)
      this.form.controls['trainingPlace'].setErrors(null)

      this.coordinator = null
      break;
  }

  
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

    !this.dateValusesDate.length? alert('لم يتم اختيارعدد أيام الدورة !') : null;
    (this.form.get('beneficiaryType').value == 7) || (this.form.get('beneficiaryType').value == null)? null :  !Boolean(this.dataSource.length)? alert('لم يتم اختيار الجهة المستفيدة !') : null
    this.form.invalid? alert('لم يتم اختيار جميع الحقول !') : null


        if (this.form.get('beneficiaryType').value == 7) {
            if(!(Boolean(this.form.valid) && Boolean(this.dateValusesDate.length))) return;
        } else {
            if((!(Boolean(this.form.valid) && Boolean(this.dateValusesDate.length)) || !Boolean(this.dataSource.length))) return;
        }
    

    this.ngxSpinnerService.show()
    

        this.apollo.mutate({
          mutation: gql`
            mutation createCourse($uID: Int! $courseName: Int! $courcesDates: Date! $catagory: Int! $level: Int! $hours: Int! $startTime: Date! $trainingPlace: String! $coache: Int! $beneficiaryType: Int! $companyProfilesANDcoordinator: String! $typePlace: Int! $test1: Date! $test2: Date! $oralTest: Date! $writtenTest: Date! $certificateModels1: Int! $certificateModels2: Int! $certificateModels3: Int!){
              createCourse(uID: $uID courseName: $courseName courcesDates: $courcesDates catagory: $catagory level: $level hours: $hours startTime: $startTime trainingPlace: $trainingPlace coache: $coache beneficiaryType: $beneficiaryType companyProfilesANDcoordinator: $companyProfilesANDcoordinator typePlace: $typePlace test1: $test1 test2: $test2 oralTest: $oralTest writtenTest: $writtenTest certificateModels1: $certificateModels1 certificateModels2: $certificateModels2 certificateModels3: $certificateModels3){
                  id    
              }
            }
            `,
            variables:{
              uID: parseInt(this.data.userID),
              courseName: parseInt(this.form.get('catagory').value == null? null: this.form.get('catagory').value == '1'? '5':'6'),
              courcesDates:  this.dateValusesDate,
              catagory:  parseInt(this.form.get('catagory').value),
              level:  parseInt(this.form.get('level').value),
              hours:  parseInt(this.form.get('hours').value),
              startTime: this.form.get('startTime').value,
              typePlace:  parseInt(this.form.get('typePlace').value),
              coache:  parseInt(this.form.get('coache').value),
              beneficiaryType: parseInt(this.form.get('beneficiaryType').value),
              companyProfilesANDcoordinator: JSON.stringify(this.dataSource),
              trainingPlace:  (this.form.get('trainingPlace').value == null)? '777000111' : this.form.get('trainingPlace').value,
              test1: this.form.get('test1').value,
              test2: this.form.get('test2').value,
              oralTest: this.form.get('oralTest').value,
              writtenTest: this.form.get('writtenTest').value,
              certificateModels1:  parseInt(this.form.get('certificateModels1').value),
              certificateModels2:  parseInt(this.form.get('certificateModels2').value),
              certificateModels3:  parseInt(this.form.get('certificateModels3').value)
          
            }
        }).subscribe(( {data}: any ) => {

        this.dialogRef.close(true);
        this.ngxSpinnerService.hide()
    
        this.snackBar.open('تمت إضافة البرنامج بنجاح','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    
      })


      this.ngxSpinnerService.hide()

    }
}




/**--------------------------------edit Course------------------------------------ */ 
/**-------------------------------------------------------------------- */ 
/**-------------------------------------------------------------------- */ 

@Component({
  selector: 'dialog-add-certificate',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>تعديل</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>


    <mat-dialog-content id="form-element" class="form-vertical" [formGroup]="form" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>


    <mat-accordion>

<mat-expansion-panel (opened)="panelOpenState = true"
                     (closed)="panelOpenState = false">
  <mat-expansion-panel-header>
    <mat-panel-title>اختر ايام الدورة:</mat-panel-title>
    <mat-panel-description> عدد أيام الدورة:&nbsp;<p style="color: red">{{dateValusesDate?.length > 0? dateValusesDate?.length:'لم يتم الاختيار!'}}</p></mat-panel-description>
  </mat-expansion-panel-header>

    <mat-grid-list cols="2" rowHeight="20rem">
      <mat-grid-tile>
        <ejs-calendar #ejCalendar (created)='onCreate()'  (renderDayCell)='$event.isDisabled = true' [firstDayOfWeek]='2' [values]='dateValusesDate' locale='ar' (change)='onChange($event)' [isMultiSelection]='true' enableRtl='true'></ejs-calendar>
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
        <mat-error *ngIf="form.get('catagory').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المستوى</mat-label>
        <mat-select formControlName="level">
          <mat-option dir="rtl" required *ngFor="let data of level" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('level').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
<!-- 
      <mat-form-field fxFlex="auto">
        <mat-label>عدد الساعات</mat-label>
        <input type="number" matInput formControlName="hours" required>
        <mat-error *ngIf="form.get('hours').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field> -->
    </div>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <ejs-timepicker  id='startTime' formControlName="startTime" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="وقت بدء الدورة" enableRtl='true' locale='ar'></ejs-timepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>المقر</mat-label>
        <mat-select formControlName="typePlace">
          <mat-option dir="rtl" required *ngFor="let data of typePlace" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('typePlace').errors?.required">حقل مطلوب</mat-error>
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
        <mat-error *ngIf="form.get('typePlace').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>نوع المستفيد</mat-label>
        <mat-select formControlName="beneficiaryType">
          <mat-option (click)="data.companyType == 'جهة'? show=true : show=false; resetInputs(data.id)" dir="rtl"  required *ngFor="let data of beneficiaryType" [value]="data.id">{{data.companyType}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('beneficiaryType').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
      </div>



      <div *ngIf="show">

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>اختر الجهة المستفيدة</mat-label>
        <mat-select formControlName="companyProfiles">
          <mat-option (click)="getCoordinator(data.id)" dir="rtl"  required *ngFor="let data of companyProfiles" [value]="data.id">{{data.companyName}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('companyProfiles').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
      <mat-label>اختر اسم المنسق</mat-label>
        <mat-select formControlName="coordinator">
          <mat-option (click)="companyCoordinator(form.get('coordinator').value, form.get('companyProfiles').value)" dir="rtl"  required *ngFor="let data of coordinator" [value]="data._01_personal.id">{{data._01_personal.name_AR}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('coordinator').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>اكتب اسم القاعة</mat-label>
        <input formControlName="trainingPlace" matInput type="text">
        <mat-error *ngIf="form.get('trainingPlace').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
  </div>

      <mat-list>
          <mat-list-item><b>الجهات المختارة</b></mat-list-item>
        <mat-divider></mat-divider>
      </mat-list>

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <!--- Note that these columns can be defined in any order.
                  The actual rendered columns are set as a property on the row definition" -->


            <!-- companyName Column -->
            <ng-container matColumnDef="companyName">
              <th mat-header-cell *matHeaderCellDef> اسم الجهة </th>
              <td mat-cell *matCellDef="let element"> {{element.companyName}} </td>
            </ng-container>


            <!-- Coordinator Column -->
            <ng-container matColumnDef="coordinatorName">
              <th mat-header-cell *matHeaderCellDef>اسم المنسق</th>
              <td mat-cell *matCellDef="let element">
                 <!-- {{element.coordinatorName}} 
                 {{element.coordinatorId}}  
                 {{element.companyId}}  -->

                    <select #selectVir (change)="changeCoordinatorName(selectVir.value, element.companyId)" formControlName="coordinator" [coorDinatorList]="{companyId: element.companyId, coordinatorId: element.coordinatorId}">
                    </select>

              </td>
            </ng-container>

            <!-- Case Column -->
            <ng-container matColumnDef="case">
              <th mat-header-cell *matHeaderCellDef> الإجراء </th>
              <td mat-cell *matCellDef="let element; let i = index"> 
                  <a (click)="deleteCourse(i)"
                      class="w-8 h-8 leading-none flex items-center justify-center hover:bg-hover text-primary bg-primary-light"
                      *ngIf="!dataSourceIDs.includes(element.companyId)"
                      mat-icon-button>
                      <mat-icon [icIcon]="icDelete" color="warn" size="22px"></mat-icon>
                  </a>
                  
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr class="example-expanded-row" mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div>

  </div>
<br><br><br>
    <mat-list>
        <mat-list-item><b>مواعيد الاختبارات</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>
    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
      <ejs-datetimepicker id='test1' formControlName="test1" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار القصير الأول" enableRtl='true' locale='ar'></ejs-datetimepicker>
      <ejs-datetimepicker id='test2' formControlName="test2" (blur)="onFocusOut()" floatLabelType='Auto' fxFlex="auto" placeholder="الاختبار القصير الثاني" enableRtl='true' locale='ar'></ejs-datetimepicker>
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
      <mat-error *ngIf="form.get('certificateModels1').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار إعادة الاختبار</mat-label>
      <mat-select formControlName="certificateModels2">
        <mat-option dir="rtl" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
      <mat-error *ngIf="form.get('certificateModels2').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

    <mat-form-field fxFlex="auto">
      <mat-label>نموذج إشعار عدم الاجتياز</mat-label>
      <mat-select formControlName="certificateModels3">
        <mat-option dir="rtl" required *ngFor="let data of certificateModels" [value]="data.id">{{data.certificatename}}</mat-option>
      </mat-select>
      <mat-error *ngIf="form.get('certificateModels3').errors?.required">حقل مطلوب</mat-error>
    </mat-form-field>

  </div>


</mat-dialog-content>

<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
  <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>تحديث</button>
  <!-- <button mat-raised-button (click)="form.reset(); coordinator = null">مسح</button> -->
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss'],
  providers: [MaskedDateTimeService]
})


export class DialogEditCourse implements OnInit {
  dataSource: any[]= []
  dataSourceIDs: any[any]= []
  displayedColumns: string[] = ['companyName', 'coordinatorName', 'case'];
  icDelete = icDelete;

  companyCoordinator(coordinator, companyProfiles){

    const coordinaANDcompanyVar = []

    const coordinaVar = this.coordinator.filter((value, index, array)=>{
      return (value._01_personal.id == coordinator)? value._01_personal : null
    })

    const companyVar = this.companyProfiles.filter((value, index, array)=>{
      return (value.id == companyProfiles)? value : null
    })


    if(!Array.isArray(this.dataSource) || !this.dataSource.length){
        coordinaANDcompanyVar.push({coordinar: {name_AR: coordinaVar[0]._01_personal.name_AR, id: coordinaVar[0]._01_personal.id}, company: {companyName: companyVar[0].companyName, id: companyVar[0].id}})
      } else {

          if(!this.dataSource.some(item => item.companyId === companyProfiles)){
            coordinaANDcompanyVar.push({coordinar: {name_AR: coordinaVar[0]._01_personal.name_AR, id: coordinaVar[0]._01_personal.id}, company: {companyName: companyVar[0].companyName, id: companyVar[0].id}})
          } 

    }


    for (let index = 0; index < coordinaANDcompanyVar.length; index++) {
      const element = coordinaANDcompanyVar[index];
      
      this.dataSource.push({companyName: element.company.companyName, companyId: element.company.id, coordinatorName: element.coordinar.name_AR, coordinatorId: element.coordinar.id})

    }

    this.dataSource = [...this.dataSource]

  }

  deleteCourse(indexId: number){
    
    this.dataSource.splice(indexId,1);
    this.dataSource = [...this.dataSource]

  }

  show = false;
  //public enableMaskSupport: boolean = true; // [enableMask]="enableMaskSupport" 
  panelOpenState = false;
  formObject: FormValidator;
  options: FormValidatorModel = {
    rules: {
        'test1': {
            required: [true, "حقل الاختبار القصير الأول مطلوب"]
        },
        'test2': {
          required: [true, "حقل الاختبار القصير الثاني مطلوب"]
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
  // let clearBtn: HTMLElement = document.createElement('button');
  // let footerElement: any = document.getElementsByClassName('e-footer-container')[0];
  // //creates the custom element for clear button
  // clearBtn.className = 'e-btn e-clear e-flat';
  // clearBtn.textContent = 'مسح';
  // footerElement.prepend(clearBtn);
  // this.ejCalendar.element.appendChild(footerElement);
  // let proxy = this;
  // // custom click handler to update the value property with null values.
  // document.querySelector('.e-footer-container .e-clear').addEventListener('click', function() {
  //     proxy.ejCalendar.values = null;
  // })
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
    beneficiaryType:  new FormControl({value: null, disabled: true}, [Validators.required]),
    level:  new FormControl({value: null, disabled: true}, [Validators.required]),
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
  coordinators: any;




constructor(
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }



  ngOnInit(){


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
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة',
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'timepicker': {
      placeholder:"اختر الوقت",
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'datepicker': {
      placeholder:"اختر التاريخ",
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة'
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
          return parseInt(value.id) == 7 || parseInt(value.id) == 3 || parseInt(value.id) == 8
         })
    
        this.level = data.mexCourseTables.level.filter((value, index, array)=>{
          return parseInt(value.id) == 1 || parseInt(value.id) == 3
         })
    
        this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
          return parseInt(value.id) == 1 || parseInt(value.id) == 2
         })
    
         
        this.coache = data.mexCourseTables.coache
        this.typePlace = data.mexCourseTables.typePlace
        this.certificateModels = data.mexCourseTables.certificateModels
        this.companyProfiles = data.mexCourseTables.companyProfiles
    
    
    
        
        this.apollo.watchQuery({
          query: gql`
              query courseID($id: Int!){
                courseID(id: $id){
                status
                courcesDates
                hours
                start_time
                test_1
                test_2
                oral_test
                written_test
                
                level_id
                catagory_id
                coache_id
                type_place_id
                company_type_id
                
                courcesExtend1{
                  courceId
                  companyProfilesANDcoordinator
                  trainingPlace
                }
                
                certificates_1_id
                certificates_2_id
                certificates_3_id
              }
            }
            `,
            variables: {
              id: parseInt(this.data.courseNo)
            }
        }).valueChanges.subscribe( async ( {data}: any ) => {
        //  this.dateValusesDate = [new Date('8/8/2020'), new Date('8/8/2020'), new Date('8/9/2020')];
         this.dateValusesDate = JSON.parse(data.courseID.courcesDates).map( dateString => new Date(dateString) )
         
         if((data.courseID.company_type_id == 7)){
           this.show = false
         } else {
           this.show = true
            this.dataSource = JSON.parse(data.courseID.courcesExtend1?.companyProfilesANDcoordinator)
            this.dataSourceIDs = JSON.parse(data.courseID.courcesExtend1?.companyProfilesANDcoordinator)
         }

         let a: any[any]=[]
         for (let index = 0; index < this.dataSourceIDs.length; index++) {
           const element = this.dataSourceIDs[index];

           a.push(element.companyId)
           
         }

         this.dataSourceIDs = a
         //  data.courseID.company_type_id == 3? await this.getCoordinator(data.courseID.courcesExtend1.companyProfilesId): null;

         this.form = this.fb.group({
          beneficiaryType:  new FormControl({value: data.courseID.company_type_id.toString(), disabled: true}, [Validators.required]),
          level:  new FormControl(data.courseID.level_id.toString(), [Validators.required]),
          hours:  new FormControl(data.courseID.hours, [Validators.required]),
          catagory:  new FormControl(data.courseID.catagory_id.toString(), [Validators.required]),
          coache:  new FormControl(data.courseID.coache_id.toString(), [Validators.required]),
          typePlace:  new FormControl(data.courseID.type_place_id.toString(), [Validators.required]),

          companyProfiles:  new FormControl(null),
          coordinator:  new FormControl(null),

          certificateModels1:  new FormControl(data.courseID.certificates_1_id.toString(), [Validators.required]),
          certificateModels2:  new FormControl(data.courseID.certificates_2_id.toString(), [Validators.required]),
          certificateModels3:  new FormControl(data.courseID.certificates_3_id.toString(), [Validators.required]),
          trainingPlace:  new FormControl(!(data.courseID.company_type_id == 7)? data.courseID.courcesExtend1.trainingPlace : null, !(data.courseID.company_type_id == 7)? Validators.required : null),
    
    
          startTime: new FormControl (data.courseID.start_time, [Validators.required]),
          test1:  new FormControl(data.courseID.test_1.toString(), [Validators.required]),
          test2:  new FormControl(data.courseID.test_2.toString(), [Validators.required]),
          oralTest:  new FormControl(data.courseID.oral_test.toString(), [Validators.required]),
          writtenTest:  new FormControl(data.courseID.written_test.toString(), [Validators.required])
        });
        })
    
        this.apollo.watchQuery({
          query: gql`
              query coordinators{
                coordinators{
                  _01_personal{
                    id
                    name_AR
                  }
                }
            }
            `
        }).valueChanges.subscribe(( {data}: any ) => {
          this.coordinators = data.coordinators
        })
        // console.log(this.dataSourse.courcesExtend1.companyProfilesId)
        // console.log(this.dataSourse.courcesExtend1.coordinatorId)
        // console.log(this.dataSourse.courcesExtend1.trainingPlace)
    
        this.ngxSpinnerService.hide()
    
    })
    


  }

  resetInputs(id){

    switch (id) {
      case '3':

      this.form.get('companyProfiles').setValidators(Validators.required)
      this.form.get('coordinator').setValidators(Validators.required)
      this.form.get('trainingPlace').setValidators(Validators.required)

        break;

      case '7':


        this.form.get('companyProfiles').reset()
        this.form.get('coordinator').reset()
        this.form.get('trainingPlace').reset()
      

        this.form.controls['companyProfiles'].setErrors(null)
        this.form.controls['coordinator'].setErrors(null)
        this.form.controls['trainingPlace'].setErrors(null)

        this.coordinator = null
        break;
    }

    
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


  changeCoordinatorName(coordinatorId, companyId){

    const coorObject = this.coordinators.find(value => value._01_personal.id ==  coordinatorId)._01_personal

    for (let index = 0; index < this.dataSource.length; index++) {
      const elementArr = this.dataSource[index];

      for (const key in elementArr) {

        if (Object.prototype.hasOwnProperty.call(elementArr, key)) {

          if(key == 'companyId'){
            if(elementArr[key] == companyId){
                this.dataSource[index].coordinatorId = coorObject.id
                this.dataSource[index].coordinatorName = coorObject.name_AR
            }
          }
          
        }

      }
      
    }

    this.dataSource
  }


  savaData(){

    !this.dateValusesDate.length? alert('لم يتم اختيارعدد أيام الدورة !') : null;
    (this.form.get('beneficiaryType').value == 7) || (this.form.get('beneficiaryType').value == null)? null :  !Boolean(this.dataSource.length)? alert('لم يتم اختيار الجهة المستفيدة !') : null
    this.form.invalid? alert('لم يتم اختيار جميع الحقول !') : null


        if (this.form.get('beneficiaryType').value == 7) {
            if(!(Boolean(this.form.valid) && Boolean(this.dateValusesDate.length))) return;
        } else {
            if((!(Boolean(this.form.valid) && Boolean(this.dateValusesDate.length)) || !Boolean(this.dataSource.length))) return;
        }    
    
    this.ngxSpinnerService.show()
    

        this.apollo.mutate({
          mutation: gql`
            mutation updateCourse($id: Int! $courseName: Int! $courcesDates: Date! $catagory: Int! $level: Int! $hours: Int! $startTime: Date! $trainingPlace: String! $coache: Int! $beneficiaryType: Int! $companyProfilesANDcoordinator: String! $typePlace: Int! $test1: Date! $test2: Date! $oralTest: Date! $writtenTest: Date! $certificateModels1: Int! $certificateModels2: Int! $certificateModels3: Int!){
              updateCourse(id: $id courseName: $courseName courcesDates: $courcesDates catagory: $catagory level: $level hours: $hours startTime: $startTime trainingPlace: $trainingPlace coache: $coache beneficiaryType: $beneficiaryType companyProfilesANDcoordinator: $companyProfilesANDcoordinator typePlace: $typePlace test1: $test1 test2: $test2 oralTest: $oralTest writtenTest: $writtenTest certificateModels1: $certificateModels1 certificateModels2: $certificateModels2 certificateModels3: $certificateModels3)
            }
            `,
            variables:{
              id: parseInt(this.data.courseNo),
              courseName: parseInt(this.form.get('catagory').value == null? null: this.form.get('catagory').value == '1'? '5':'6'),
              courcesDates:  this.dateValusesDate,
              catagory:  parseInt(this.form.get('catagory').value),
              level:  parseInt(this.form.get('level').value),
              hours:  parseInt(this.form.get('hours').value),
              startTime: this.form.get('startTime').value,
              typePlace:  parseInt(this.form.get('typePlace').value),
              coache:  parseInt(this.form.get('coache').value),
              beneficiaryType: parseInt(this.form.get('beneficiaryType').value),
              companyProfilesANDcoordinator: JSON.stringify(this.dataSource),
              trainingPlace:  (this.form.get('trainingPlace').value == null)? '777000111' : this.form.get('trainingPlace').value,
              test1: this.form.get('test1').value,
              test2: this.form.get('test2').value,
              oralTest: this.form.get('oralTest').value,
              writtenTest: this.form.get('writtenTest').value,
              certificateModels1:  parseInt(this.form.get('certificateModels1').value),
              certificateModels2:  parseInt(this.form.get('certificateModels2').value),
              certificateModels3:  parseInt(this.form.get('certificateModels3').value)
          
            }
        }).subscribe(( {data}: any ) => {

          this.dialogRef.close(true);
        this.ngxSpinnerService.hide()
    
        this.snackBar.open('تمت تعديل البرنامج بنجاح','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    
      })


      this.ngxSpinnerService.hide()

    }
}



/**--------------------------------view Course------------------------------------ */ 
/**-------------------------------------------------------------------- */ 
/**-------------------------------------------------------------------- */ 

@Component({
  selector: 'dialog-add-certificate',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>تقرير</p> {{data.courseNo}} رقم الدورة: #

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>



    <mat-dialog-content id="form-element" class="form-vertical" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>

    <mat-grid-list cols="5" rowHeight="125px">

    <mat-grid-tile [colspan]="1" [rowspan]="1" [style.background]="'lightgreen'">
        <div class="ex1">
        <h4> <b>عدد أيام الدورة</b>:&nbsp;<span style="color: red">{{dateValusesDate?.length}}</span></h4>

        <h4 *ngFor="let val of dateValusesDate; index as i">
            <b>{{order(i+1)}}</b>: {{val | date:'EEEE, d/M/y'}}
        </h4>
      </div>
        </mat-grid-tile>



      <mat-grid-tile [colspan]="4" [rowspan]="1" [style.background]="'lightblue'">

        <table class="table1">
          <tr>
            <th class="th1 td1 th2 td2">الفئة</th>
            <th class="th1 td1 th2 td2">المستوى</th>
            <th class="th1 td1 th2 td2">عدد الساعات</th>
            <th class="th1 td1 th2 td2">وقت البدء</th>
            <th class="th1 td1 th2 td2">المقر</th>
            <th class="th1 td1 th2 td2">اسم المدرب</th>
          </tr>
          <tr>
            <td class="th1 td1 th2 td2">{{catagoryName}}</td>
            <td class="th1 td1 th2 td2">{{levelNumber}}</td>
            <td class="th1 td1 th2 td2">{{hours}}</td>
            <td class="th1 td1 th2 td2">{{start_time | date: 'h:mm a'}}</td>
            <td class="th1 td1 th2 td2">{{typePlaceName}}</td>
            <td class="th1 td1 th2 td2">{{coacheName}}</td>
          </tr>
        </table>

</mat-grid-tile>

      </mat-grid-list>

<br>









      <mat-list>
  <mat-list-item><b>بيانات الجهة</b></mat-list-item>
  <mat-divider></mat-divider>
</mat-list>



<mat-grid-list cols="5" rowHeight="125px">

<mat-grid-tile [colspan]="5" [rowspan]="1" [style.background]="'lightblue'">

<table class="table1">
  <tr>
    <th class="th1 td1 th2 td2">نوع المستفيد</th>
    <th class="th1 td1 th2 td2">الجهة المستفيدة</th>
    <th class="th1 td1 th2 td2">اسم المنسق</th>
    <th class="th1 td1 th2 td2">اسم القاعة</th>
  </tr>
  <tr>
    <td class="th1 td1 th2 td2">{{beneficiaryTypeName}}</td>
    <td class="th1 td1 th2 td2">{{companyProfilesName}}</td>
    <td class="th1 td1 th2 td2">{{coordinatorName}}</td>
    <td class="th1 td1 th2 td2">{{trainingPlace}}</td>
  </tr>
</table>

</mat-grid-tile>

      </mat-grid-list>



    <mat-list>
        <mat-list-item><b>مواعيد الاختبارات</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list>

    <mat-grid-list cols="5" rowHeight="125px">

<mat-grid-tile [colspan]="5" [rowspan]="1" [style.background]="'lightblue'">

<table class="table1">
  <tr>
    <th class="th1 td1 th2 td2">الاختبار القصير الأول</th>
    <th class="th1 td1 th2 td2">الاختبار القصير الثاني</th>
    <th class="th1 td1 th2 td2">الاختبار الشفوي</th>
    <th class="th1 td1 th2 td2">الاختبار التحريري</th>
  </tr>
  <tr>
    <td class="th1 td1 th2 td2">{{test1 | date:'EEEE, d/M/y, h:mm a'}}</td>
    <td class="th1 td1 th2 td2">{{test2 | date:'EEEE, d/M/y, h:mm a'}}</td>
    <td class="th1 td1 th2 td2">{{oralTest | date:'EEEE, d/M/y, h:mm a'}}</td>
    <td class="th1 td1 th2 td2">{{writtenTest | date:'EEEE, d/M/y, h:mm a'}}</td>
  </tr>
</table>

</mat-grid-tile>

      </mat-grid-list>




</mat-dialog-content>

<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss'],
  providers: [MaskedDateTimeService]
})


export class DialogViewCourse implements OnInit {
  show = false;

  panelOpenState = false;
  formObject: FormValidator;
  options: FormValidatorModel = {
    rules: {
        'test1': {
            required: [true, "حقل الاختبار القصير الأول مطلوب"]
        },
        'test2': {
          required: [true, "حقل الاختبار القصير الثاني مطلوب"]
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


  

  start_time: any;
  hours: any;

  courceName: any;

  beneficiaryType: any;
  beneficiaryTypeName: any;

  level: any;
  levelNumber: any;

  catagory: any;
  catagoryName: any;

  coache: any;
  coacheName: any;

  typePlace: any;
  typePlaceName: any;

  certificateModels: any;

  companyProfiles: any;
  companyProfilesName: any;

  coordinator: any;
  coordinatorName: any;

  trainingPlace: any;

  startTime: any
  test1: any
  test2: any
  oralTest: any
  writtenTest: any

constructor(
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }



  ngOnInit(){


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
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة',
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'timepicker': {
      placeholder:"اختر الوقت",
      // hour: 'ساعة',
      // minute: 'دقيقة'
      }
      }
      });
  
      L10n.load({
      'ar': {
      'datepicker': {
      placeholder:"اختر التاريخ",
      today:"اليوم",
      // day: 'يوم',
      // month: 'شهر',
      // year: 'سنة'
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
          return parseInt(value.id) == 7 || parseInt(value.id) == 3 || parseInt(value.id) == 8
         })
    
        this.level = data.mexCourseTables.level.filter((value, index, array)=>{
          return parseInt(value.id) == 1 || parseInt(value.id) == 3
         })
    
        this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
          return parseInt(value.id) == 1 || parseInt(value.id) == 2
         })
    
         
        this.coache = data.mexCourseTables.coache
        this.typePlace = data.mexCourseTables.typePlace
        this.certificateModels = data.mexCourseTables.certificateModels
        this.companyProfiles = data.mexCourseTables.companyProfiles
    
    
    
        
        this.apollo.watchQuery({
          query: gql`
              query courseID($id: Int!){
                courseID(id: $id){
                status
                courcesDates
                hours
                start_time
                test_1
                test_2
                oral_test
                written_test
                
                level_id
                catagory_id
                coache_id
                type_place_id
                company_type_id
                
                courcesExtend1{
                  courceId
                  companyProfilesANDcoordinator
                  trainingPlace
                }
                
                certificates_1_id
                certificates_2_id
                certificates_3_id
              }
            }
            `,
            variables: {
              id: parseInt(this.data.courseNo)
            }
        }).valueChanges.subscribe( async ( {data}: any ) => {

        //  this.dateValusesDate = [new Date('8/8/2020'), new Date('8/8/2020'), new Date('8/9/2020')];
         this.dateValusesDate = JSON.parse(data.courseID.courcesDates).map( dateString => new Date(dateString) )
         
         data.courseID.company_type_id == 3? this.show = true : this.show = false;

         this.catagoryName = this.catagory.filter((value, index, array)=>{
          return parseInt(value.id) == parseInt(data.courseID.catagory_id)
         })
         this.catagoryName = this.catagoryName[0].name


         this.levelNumber = this.level.filter((value, index, array)=>{
          return parseInt(value.id) == parseInt(data.courseID.level_id)
         })
          this.levelNumber = this.levelNumber[0].name

          this.typePlaceName = this.typePlace.filter((value, index, array)=>{
            return parseInt(value.id) == parseInt(data.courseID.type_place_id)
           })
           this.typePlaceName = this.typePlaceName[0].name

           this.start_time = data.courseID.start_time
           this.hours = data.courseID.hours

           this.coacheName = this.coache.filter((value, index, array)=>{
            return parseInt(value.id) == parseInt(data.courseID.coache_id)
           })
           this.coacheName = this.coacheName[0].name


           if(!(data.courseID.company_type_id == 7)){

                      this.trainingPlace = data.courseID.courcesExtend1.trainingPlace
                          if(!(JSON.parse(data.courseID.courcesExtend1.companyProfilesANDcoordinator).length > 1)){
                            this.companyProfilesName = JSON.parse(data.courseID.courcesExtend1.companyProfilesANDcoordinator)[0].companyName
                            this.coordinatorName = JSON.parse(data.courseID.courcesExtend1.companyProfilesANDcoordinator)[0].coordinatorName
                          } else {
                           this.companyProfilesName = 'جهات متعددة'
                           this.coordinatorName = 'جهات متعددة'
                          }
                      //  this.companyProfilesName = this.companyProfiles.filter((value, index, array)=>{
                      //   return parseInt(value.id) == parseInt(data.courseID.courcesExtend1.companyProfilesANDcoordinator)
                      //  })
                      //  this.companyProfilesName = this.companyProfilesName[0].companyName

                      //  this.getCoordinator(data.courseID.courcesExtend1.companyProfilesId, data.courseID.courcesExtend1.coordinatorId)

           } else {
            this.trainingPlace = 'لا يوجد'
            this.companyProfilesName = 'لا يوجد'
            this.coordinatorName = 'لا يوجد'
           }

                      this.beneficiaryTypeName = this.beneficiaryType.filter((value, index, array)=>{
                        return parseInt(value.id) == parseInt(data.courseID.company_type_id)
                       })
                       this.beneficiaryTypeName = this.beneficiaryTypeName[0].companyType







           this.test1 = data.courseID.test_1.toString()
           this.test2 = data.courseID.test_2.toString()
           this.oralTest = data.courseID.oral_test.toString()
           this.writtenTest = data.courseID.written_test.toString()
   
        //  this.form = this.fb.group({
        //   beneficiaryType:  new FormControl({value: data.courseID.company_type_id.toString(), disabled: true}, [Validators.required]),
        //   level:  new FormControl(data.courseID.level_id.toString(), [Validators.required]),
        //   hours:  new FormControl(data.courseID.hours, [Validators.required]),
        //   catagory:  new FormControl(data.courseID.catagory_id.toString(), [Validators.required]),
        //   coache:  new FormControl(data.courseID.coache_id.toString(), [Validators.required]),
        //   typePlace:  new FormControl(data.courseID.type_place_id.toString(), [Validators.required]),
        //   certificateModels1:  new FormControl(data.courseID.certificates_1_id.toString(), [Validators.required]),
        //   certificateModels2:  new FormControl(data.courseID.certificates_2_id.toString(), [Validators.required]),
        //   certificateModels3:  new FormControl(data.courseID.certificates_3_id.toString(), [Validators.required]),
    
        //   companyProfiles:  new FormControl(data.courseID.company_type_id == 3? data.courseID.courcesExtend1.companyProfilesId.toString() : null, data.courseID.company_type_id == 3? Validators.required : null),
        //   coordinator:  new FormControl(data.courseID.company_type_id == 3? data.courseID.courcesExtend1.coordinatorId.toString() : null, data.courseID.company_type_id == 3? Validators.required : null),
        //   trainingPlace:  new FormControl(data.courseID.company_type_id == 3? data.courseID.courcesExtend1.trainingPlace : null, data.courseID.company_type_id == 3? Validators.required : null),
    
    
        //   startTime: new FormControl (data.courseID.start_time, [Validators.required]),
        //   test1:  new FormControl(data.courseID.test_1.toString(), [Validators.required]),
        //   test2:  new FormControl(data.courseID.test_2.toString(), [Validators.required]),
        //   oralTest:  new FormControl(data.courseID.oral_test.toString(), [Validators.required]),
        //   writtenTest:  new FormControl(data.courseID.written_test.toString(), [Validators.required])
        // });
        })


        // console.log(this.dataSourse.courcesExtend1.companyProfilesId)
        // console.log(this.dataSourse.courcesExtend1.coordinatorId)
        // console.log(this.dataSourse.courcesExtend1.trainingPlace)
    
        this.ngxSpinnerService.hide()
    
    })
    


  }



  getCoordinator(companyId, coordinatorId){

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
          companyprofile_id: companyId
        }
    }).valueChanges.subscribe( async( {data}: any ) => {

      this.coordinatorName = data.coordinator.filter((value, index, array)=>{
        return parseInt(value._01_personal.id) == parseInt(coordinatorId)
       })

       this.coordinatorName = this.coordinatorName[0]._01_personal.name_AR

    })
  


    this.ngxSpinnerService.hide()
  }


  courseStatus(){

  }


}


/**--------------------------------link Course------------------------------------ */ 
/**-------------------------------------------------------------------- */ 
/**-------------------------------------------------------------------- */ 

@Component({
  selector: 'dialog-link-form',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p><b>رقم الدورة:</b>  #{{data.courseNo}} </p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>

 <mat-tab-group mat-align-tabs="center">

  <mat-tab label="أفراد" *ngIf="afrad">
    
  <mat-dialog-content id="form-element" class="form-vertical" class="mat-typography" novalidate>
<br>

<p><b>رابط التسجيل:</b> {{ 'http://localhost:4200/newRejester/'+link.link1 }}</p>
<mat-slide-toggle [(ngModel)]="linkStatus1">حالة الرابط</mat-slide-toggle>

<br>

    <div fxLayoutAlign="center" *ngIf="(level == 8)">

      <mat-radio-group #radioGroup="matRadioGroup" (change)="chooseLevels = radioGroup.value" aria-label="Select an option">
        <mat-radio-button value="1">المستوى الأول</mat-radio-button>
        <mat-radio-button value="2">المستوى الثاني</mat-radio-button>
        <mat-radio-button value="3">المستويين الأول والثاني</mat-radio-button>
      </mat-radio-group>

      </div>
 
    

    <div [ngSwitch]="chooseLevels">
      <div *ngSwitchCase="1">

          <mat-slide-toggle (click)="!courseStatus1? priceCourse1 = 0 : priceCourse1 = 0" [(ngModel)]="courseStatus1">رسوم البرنامج</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="courseStatus1" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCourse1" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate1Status1? priceCertificate1 = 0 : priceCertificate1 = 0" [(ngModel)]="certificate1Status1">رسوم شهادة الشركة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate1Status1" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate1"oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate2Status2? priceCertificate2 = 0 : priceCertificate2 = 0" [(ngModel)]="certificate2Status2">رسوم شهادة موثقة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate2Status2" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate2" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>
      </div>

      <div *ngSwitchCase="2">
        
      <mat-slide-toggle (click)="!courseStatus2? priceCourse2 = 0 : priceCourse2 = 0" [(ngModel)]="courseStatus2">رسوم البرنامج</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="courseStatus2" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCourse2" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate1Status3? priceCertificate3 = 0 : priceCertificate3 = 0" [(ngModel)]="certificate1Status3">رسوم شهادة الشركة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate1Status3" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate3"oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate2Status4? priceCertificate4 = 0 : priceCertificate4 = 0" [(ngModel)]="certificate2Status4">رسوم شهادة موثقة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate2Status4" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate4" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

      </div>
      <div *ngSwitchCase="3">
        
      <mat-slide-toggle (click)="!courseStatus3? priceCourse3 = 0 : priceCourse3 = 0" [(ngModel)]="courseStatus3">رسوم البرنامج</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="courseStatus3" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCourse3" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate1Status5? priceCertificate5 = 0 : priceCertificate5 = 0" [(ngModel)]="certificate1Status5">رسوم شهادة الشركة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate1Status5" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate5"oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate2Status6? priceCertificate6 = 0 : priceCertificate6 = 0" [(ngModel)]="certificate2Status6">رسوم شهادة موثقة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate2Status6" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate6" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>


      </div>

      <div *ngSwitchDefault>
        <div *ngIf="!(level == 8)">
          <mat-slide-toggle (click)="!courseStatus1? priceCourse1 = 0 : priceCourse1 = 0" [(ngModel)]="courseStatus1">رسوم البرنامج</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="courseStatus1" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCourse1" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate1Status1? priceCertificate1 = 0 : priceCertificate1 = 0" [(ngModel)]="certificate1Status1">رسوم شهادة الشركة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate1Status1" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate1"oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>

          <br>

          <mat-slide-toggle (click)="!certificate2Status2? priceCertificate2 = 0 : priceCertificate2 = 0" [(ngModel)]="certificate2Status2">رسوم شهادة موثقة</mat-slide-toggle>
          &nbsp;&nbsp;&nbsp;
          <mat-form-field style="width: 150px" *ngIf="certificate2Status2" appearance="fill" floatLabel="always">
            <mat-label>أضف مبلغ الدفع</mat-label>
            <span matPrefix>ر.س&nbsp;</span>

            <input autocomplete="off" [(ngModel)]="priceCertificate2" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
          </mat-form-field>
</div>

      </div>
    </div>






</mat-dialog-content>


  </mat-tab>
  
  <mat-tab label="جهة | جهات" *ngIf="jehat">
    
  <mat-dialog-content id="form-element" class="form-vertical" class="mat-typography" novalidate>
<br>

<p><b>رابط التسجيل:</b> {{ 'http://localhost:4200/newRejester/'+link.link2 }}</p>
<mat-slide-toggle [(ngModel)]="linkStatus2">حالة الرابط</mat-slide-toggle>

<br>

<div fxLayoutAlign="center" *ngIf="(level == 8)">

  <mat-radio-group #radioGroup2="matRadioGroup" (change)="chooseLevels2 = radioGroup2.value" aria-label="Select an option">
    <mat-radio-button value="1">المستوى الأول</mat-radio-button>
    <mat-radio-button value="2">المستوى الثاني</mat-radio-button>
    <mat-radio-button value="3">المستويين الأول والثاني</mat-radio-button>
  </mat-radio-group>

  </div>



<div [ngSwitch]="chooseLevels2">
  <div *ngSwitchCase="1">
  <mat-slide-toggle (click)="!courseStatus4? priceCourse4 = 0 : priceCourse4 = 0" [(ngModel)]="courseStatus4">رسوم البرنامج</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="courseStatus4" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCourse4" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate1Status7? priceCertificate7 = 0 : priceCertificate7 = 0" [(ngModel)]="certificate1Status7">رسوم شهادة الشركة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate1Status7" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate7" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate2Status8? priceCertificate8 = 0 : priceCertificate8 = 0" [(ngModel)]="certificate2Status8">رسوم شهادة موثقة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate2Status8" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate8"  pattern="[0-9]*" matInput type="text">
</mat-form-field>

  </div>
  <div *ngSwitchCase="2">

  <mat-slide-toggle (click)="!courseStatus5? priceCourse5 = 0 : priceCourse5 = 0" [(ngModel)]="courseStatus5">رسوم البرنامج</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="courseStatus5" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCourse5" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate1Status9? priceCertificate9 = 0 : priceCertificate9 = 0" [(ngModel)]="certificate1Status9">رسوم شهادة الشركة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate1Status9" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate9" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate2Status10? priceCertificate10 = 0 : priceCertificate10 = 0" [(ngModel)]="certificate2Status10">رسوم شهادة موثقة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate2Status10" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate10"  pattern="[0-9]*" matInput type="text">
</mat-form-field>


  </div>
  <div *ngSwitchCase="3">

  <mat-slide-toggle (click)="!courseStatus6? priceCourse6 = 0 : priceCourse6 = 0" [(ngModel)]="courseStatus6">رسوم البرنامج</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="courseStatus6" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCourse6" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate1Status11? priceCertificate11 = 0 : priceCertificate11 = 0" [(ngModel)]="certificate1Status11">رسوم شهادة الشركة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate1Status11" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate11" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
</mat-form-field>

<br>

<mat-slide-toggle  (click)="!certificate2Status12? priceCertificate12 = 0 : priceCertificate12 = 0" [(ngModel)]="certificate2Status12">رسوم شهادة موثقة</mat-slide-toggle>
&nbsp;&nbsp;&nbsp;
<mat-form-field style="width: 150px" *ngIf="certificate2Status12" appearance="fill" floatLabel="always">
  <mat-label>أضف مبلغ الدفع</mat-label>
  <span matPrefix>ر.س&nbsp;</span>

  <input autocomplete="off" [(ngModel)]="priceCertificate12"  pattern="[0-9]*" matInput type="text">
</mat-form-field>


  </div>


  <div *ngSwitchDefault>
     <div *ngIf="!(level == 8)">     
        <mat-slide-toggle (click)="!courseStatus2? priceCourse2 = 0 : priceCourse2 = 0" [(ngModel)]="courseStatus2">رسوم البرنامج</mat-slide-toggle>
      &nbsp;&nbsp;&nbsp;
      <mat-form-field style="width: 150px" *ngIf="courseStatus2" appearance="fill" floatLabel="always">
        <mat-label>أضف مبلغ الدفع</mat-label>
        <span matPrefix>ر.س&nbsp;</span>

        <input autocomplete="off" [(ngModel)]="priceCourse2" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
      </mat-form-field>

      <br>

      <mat-slide-toggle  (click)="!certificate1Status3? priceCertificate3 = 0 : priceCertificate3 = 0" [(ngModel)]="certificate1Status3">رسوم شهادة الشركة</mat-slide-toggle>
      &nbsp;&nbsp;&nbsp;
      <mat-form-field style="width: 150px" *ngIf="certificate1Status3" appearance="fill" floatLabel="always">
        <mat-label>أضف مبلغ الدفع</mat-label>
        <span matPrefix>ر.س&nbsp;</span>

        <input autocomplete="off" [(ngModel)]="priceCertificate3" oninput="this.value=this.value.replace(/[^0-9]/g,'')" matInput type="text">
      </mat-form-field>

      <br>

      <mat-slide-toggle  (click)="!certificate2Status4? priceCertificate4 = 0 : priceCertificate4 = 0" [(ngModel)]="certificate2Status4">رسوم شهادة موثقة</mat-slide-toggle>
      &nbsp;&nbsp;&nbsp;
      <mat-form-field style="width: 150px" *ngIf="certificate2Status4" appearance="fill" floatLabel="always">
        <mat-label>أضف مبلغ الدفع</mat-label>
        <span matPrefix>ر.س&nbsp;</span>

        <input autocomplete="off" [(ngModel)]="priceCertificate4"  pattern="[0-9]*" matInput type="text">
      </mat-form-field>
</div>

  </div>

</div>

</mat-dialog-content>


  </mat-tab>
</mat-tab-group>


<mat-dialog-actions align="start">
  <button mat-raised-button color="primary" (click)="changePricsie()" cdkFocusInitial>تحديث</button>
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss'],
  providers: [MaskedDateTimeService]
})


export class DialogLinkCourse implements OnInit {

  icClose = icClose
  link: any = {};


  beneficiaryId: number
  level: number
  chooseLevels: any
  chooseLevels2: any

  priceCourse1: number
  priceCertificate1: number
  priceCertificate2: number
  
  priceCourse2: number
  priceCertificate3: number
  priceCertificate4: number

  priceCourse3: number
  priceCertificate5: number
  priceCertificate6: number

  priceCourse4: number
  priceCertificate7: number
  priceCertificate8: number

  priceCourse5: number
  priceCertificate9: number
  priceCertificate10: number

  priceCourse6: number
  priceCertificate11: number
  priceCertificate12: number
  
  linkStatus1: boolean
  courseStatus1: boolean
  certificate1Status1: boolean
  certificate2Status2: boolean

  courseStatus2: boolean
  certificate1Status3: boolean
  certificate2Status4: boolean

  courseStatus3: boolean
  certificate1Status5: boolean
  certificate2Status6: boolean
  
  /*** */
  linkStatus2: boolean
  courseStatus4: boolean
  certificate1Status7: boolean
  certificate2Status8: boolean

  courseStatus5: boolean
  certificate1Status9: boolean
  certificate2Status10: boolean

  courseStatus6: boolean
  certificate1Status11: boolean
  certificate2Status12: boolean

  afrad: boolean = false
  jehat: boolean = false

  courseId: number

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }



  ngOnInit(){
    
    this.apollo.watchQuery({
      query: gql`
          query coursesLinkRejecter($courseId: Int){
            coursesLinkRejecter(courseId: $courseId){
              link
              courseId
              status
              price
              beneficiaryType
              level
          }
        }
        `,
        variables: {
          courseId: parseInt(this.data.courseNo)
        }
    }).valueChanges.subscribe(( {data}: any ) => {

      const links = JSON.parse(data.coursesLinkRejecter.link)
      this.beneficiaryId = JSON.parse(data.coursesLinkRejecter.beneficiaryType)
      this.level = JSON.parse(data.coursesLinkRejecter.level)
      const prices = JSON.parse(data.coursesLinkRejecter.price)
      const status = JSON.parse(data.coursesLinkRejecter.status)

      

      if(this.level == 8){
        console.log('if', '--', 'level','-',this.level)



        if(this.beneficiaryId == 8){
          console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
 

          this.afrad = true
          this.jehat = true
          
          this.link.link1 = links[0]
          this.link.link2 = links[1]
          

          this.priceCourse1 = prices[0]
          this.priceCertificate1 = prices[1]
          this.priceCertificate2 = prices[2]

          this.priceCourse2 = prices[3]
          this.priceCertificate3 = prices[4]
          this.priceCertificate4 = prices[5]

          this.priceCourse3 = prices[6]
          this.priceCertificate5 = prices[7]
          this.priceCertificate6 = prices[8]
          /*** */
          this.priceCourse4 = prices[9]
          this.priceCertificate7 = prices[10]
          this.priceCertificate8 = prices[11]


          this.priceCourse5 = prices[12]
          this.priceCertificate9 = prices[13]
          this.priceCertificate10 = prices[14]

          this.priceCourse6 = prices[15]
          this.priceCertificate11 = prices[16]
          this.priceCertificate12 = prices[17]



                
          this.linkStatus1 = status[0]
          this.courseStatus1 = status[1]
          this.certificate1Status1 = status[2]
          this.certificate2Status2 = status[3]
      
          this.courseStatus2 = status[4]
          this.certificate1Status3 = status[5]
          this.certificate2Status4 = status[6]
      
          this.courseStatus3 = status[7]
          this.certificate1Status5 = status[8]
          this.certificate2Status6 = status[9]
      
          this.linkStatus2 = status[10]
          this.courseStatus4 = status[11]
          this.certificate1Status7 = status[12]
          this.certificate2Status8 = status[13]
      
          this.courseStatus5 = status[14]
          this.certificate1Status9 = status[15]
          this.certificate2Status10 = status[16]
      
          this.courseStatus6 = status[17]
          this.certificate1Status11 = status[18]
          this.certificate2Status12 = status[19]

        } else {
          
          console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)


          if(this.beneficiaryId == 7){
            console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
  

            this.afrad = true
            this.link.link1 = links[0]

            this.priceCourse1 = prices[0]
            this.priceCertificate1 = prices[1]
            this.priceCertificate2 = prices[2]
  
            this.priceCourse2 = prices[3]
            this.priceCertificate3 = prices[4]
            this.priceCertificate4 = prices[5]
  
            this.priceCourse3 = prices[6]
            this.priceCertificate5 = prices[7]
            this.priceCertificate6 = prices[8]
  
  

                            
            this.linkStatus1 = status[0]
            this.courseStatus1 = status[1]
            this.certificate1Status1 = status[2]
            this.certificate2Status2 = status[3]
        
            this.courseStatus2 = status[4]
            this.certificate1Status3 = status[5]
            this.certificate2Status4 = status[6]
        
            this.courseStatus3 = status[7]
            this.certificate1Status5 = status[8]
            this.certificate2Status6 = status[9]

          } else {
            console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)


                                    

            this.jehat = true;

            this.link.link2 = links[0]

            this.priceCourse2 = prices[0]
            this.priceCertificate3 = prices[1]
            this.priceCertificate4 = prices[2]


            this.priceCourse3 = prices[3]
            this.priceCertificate5 = prices[4]
            this.priceCertificate6 = prices[5]
  
            this.priceCourse4 = prices[6]
            this.priceCertificate7 = prices[7]
            this.priceCertificate8 = prices[8]
  
  
  
  
            this.linkStatus2 = status[0]

            this.courseStatus2 = status[1]
            this.certificate1Status3 = status[2]
            this.certificate2Status4 = status[3]
        
            this.courseStatus3 = status[4]
            this.certificate1Status5 = status[5]
            this.certificate2Status6 = status[6]
        
            this.courseStatus4 = status[7]
            this.certificate1Status7 = status[8]
            this.certificate2Status8 = status[9]

          }

        }

      } else {
        
        console.log('else', '--', 'level','-',this.level)

        if((this.beneficiaryId == 7)){
          console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)


        this.afrad = true
        this.link.link1 = links[0];

        this.priceCourse1 = prices[0]
        this.priceCertificate1 = prices[1]
        this.priceCertificate2 = prices[2]

        this.linkStatus1 = status[0]
        this.courseStatus1 = status[1]
        this.certificate1Status1 = status[2]
        this.certificate2Status2 = status[3]


        } else {
          console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)

 
          if((this.beneficiaryId == 8)){
            console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)

            this.afrad = true;    
            this.jehat = true;
    
            this.link.link1 = links[0];
            this.link.link2 = links[1];
    
            
            this.priceCourse1 = prices[0]
            this.priceCertificate1 = prices[1]
            this.priceCertificate2 = prices[2]
    
            this.linkStatus1 = status[0]
            this.courseStatus1 = status[1]
            this.certificate1Status1 = status[2]
            this.certificate2Status2 = status[3]
    
    


              this.priceCourse2 = prices[3]
              this.priceCertificate3 = prices[4]
              this.priceCertificate4 = prices[5]
    
              this.linkStatus2 = status[4]
              this.courseStatus2 = status[5]
              this.certificate1Status3 = status[6]
              this.certificate2Status4 = status[7]
    
    

          } else {
            console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)

            this.jehat = true;
            this.link.link2 = links[0];

                
    
            this.priceCourse2 = prices[0]
            this.priceCertificate3 = prices[1]
            this.priceCertificate4 = prices[2]
  
            this.linkStatus2 = status[0]
            this.courseStatus2 = status[1]
            this.certificate1Status3 = status[2]
            this.certificate2Status4 = status[3]

          }

          
        }

      }

    
    })
  }


  changePricsie(){

    const pricesData = []
    const statusData = []


    console.log('-/*-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/')
    if(this.level == 8){
      console.log('if', '--', 'level','-',this.level)

      if(this.beneficiaryId == 8){
        console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
        pricesData.push(this.priceCourse1, this.priceCertificate1, this.priceCertificate2, this.priceCourse2, this.priceCertificate3, this.priceCertificate4, this.priceCourse3, this.priceCertificate5, this.priceCertificate6,this.priceCourse4, this.priceCertificate7,this.priceCertificate8,this.priceCourse5, this.priceCertificate9,this.priceCertificate10,this.priceCourse6, this.priceCertificate11,this.priceCertificate12)
        statusData.push(this.linkStatus1, this.courseStatus1, this.certificate1Status1, this.certificate2Status2, this.courseStatus2, this.certificate1Status3, this.certificate2Status4, this.courseStatus3, this.certificate1Status5, this.certificate2Status6, this.courseStatus4,this.linkStatus2, this.certificate1Status7, this.certificate2Status8, this.courseStatus5, this.certificate1Status9, this.certificate2Status10, this.courseStatus6, this.certificate1Status11, this.certificate2Status12)


      } else {
        console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)


        if(this.beneficiaryId == 7){
          console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
          pricesData.push(this.priceCourse1, this.priceCertificate1, this.priceCertificate2, this.priceCourse2, this.priceCertificate3, this.priceCertificate4, this.priceCourse3, this.priceCertificate5, this.priceCertificate6)
          statusData.push(this.linkStatus1, this.courseStatus1, this.certificate1Status1, this.certificate2Status2, this.courseStatus2, this.certificate1Status3, this.certificate2Status4, this.courseStatus3, this.certificate1Status5, this.certificate2Status6)
  

        } else {
          console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)
                   pricesData.push(this.priceCourse2, this.priceCertificate3,this.priceCertificate4,this.priceCourse3, this.priceCertificate5,this.priceCertificate6,this.priceCourse4, this.priceCertificate7,this.priceCertificate8)
statusData.push(this.linkStatus2, this.courseStatus2, this.certificate1Status3, this.certificate2Status4, this.courseStatus3, this.certificate1Status5, this.certificate2Status6, this.courseStatus4, this.certificate1Status7, this.certificate2Status8)
  
        }

      }

    } else {
      console.log('else', '--', 'level','-',this.level)

    if((this.beneficiaryId == 7)){
      console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
          pricesData.push(this.priceCourse1, this.priceCertificate1,this.priceCertificate2)
          statusData.push(this.linkStatus1, this.courseStatus1, this.certificate1Status1, this.certificate2Status2)

    } else {
      console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)

      if((this.beneficiaryId == 8)){
        console.log('if', '--', 'beneficiaryId','-',this.beneficiaryId)
        pricesData.push(this.priceCourse1, this.priceCertificate1, this.priceCertificate2, this.priceCourse2, this.priceCertificate3, this.priceCertificate4)
        statusData.push(this.linkStatus1, this.courseStatus1, this.certificate1Status1, this.certificate2Status2,this.linkStatus2, this.courseStatus2, this.certificate1Status3, this.certificate2Status4)

      } else {
        console.log('else', '--', 'beneficiaryId','-',this.beneficiaryId)
        
        pricesData.push(this.priceCourse2, this.priceCertificate3,this.priceCertificate4)
        statusData.push(this.linkStatus2, this.courseStatus2, this.certificate1Status3, this.certificate2Status4)


      }

    }

    }
    console.log('-/*-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/')



console.log(pricesData)
console.log(statusData)
      return
      this.apollo.mutate({
        mutation: gql`
          mutation updateCoursesLinkRejecter($courseId: Int! $status: String $price: String){
            updateCoursesLinkRejecter(courseId: $courseId status: $status price: $price)
          }
          `,
          variables:{
            courseId: this.courseId,
            status: JSON.stringify(statusData),
            price: JSON.stringify(pricesData)
          }
      }).subscribe(( {data}: any ) => {

        this.snackBar.open('تم التحديث','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        
      })

  }





}