import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

export interface PeriodicElement {

  id: number;
  courseNo: number;
  courceName: string;
  beneficiaryType: string;
  level: string;
  startTime: Date;
  sex: string;
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
  displayedColumns: string[] = ['id', 'courseNo', 'level', 'sex', 'beneficiaryType', 'hours', 'days', 'courcesDates', 'startTime', 'typePlace', 'coache', 'organisationName', 'edit2', 'edit', 'updatedAt', 'createdAt'];
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
                          sex{
                            id
                            type
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
                            sex: element.sex.name,
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

@Component({
  selector: 'dialog-add-certificate',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>إنشاء نموذج جديد</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>



 <app-native-datetime></app-native-datetime>
<app-moment-datetime></app-moment-datetime>

<!--    
<mat-dialog-content [formGroup]="form" class="mat-typography" novalidate>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

    <mat-form-field fxFlex="auto">
        <mat-label>الفئة</mat-label>
        <mat-select formControlName="sex">
          <mat-option dir="rtl" required *ngFor="let data of sex" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المستوى</mat-label>
        <mat-select formControlName="level">
          <mat-option dir="rtl" required *ngFor="let data of level" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>نوع المستفيد</mat-label>
        <mat-select formControlName="beneficiaryType">
          <mat-option dir="rtl" disabled="false"  required *ngFor="let data of beneficiaryType" selected="6" [value]="data.id">{{data.companyType}}</mat-option>
        </mat-select>
      </mat-form-field>

    </div>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>اسم المدرب</mat-label>
        <mat-select formControlName="coache">
          <mat-option dir="rtl" required *ngFor="let data of coache" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المقر</mat-label>
        <mat-select formControlName="typePlace">
          <mat-option dir="rtl" required *ngFor="let data of typePlace" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
      </mat-form-field>

  </div>

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

  </div> -->

  <!-- <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
    <mat-form-field fxFlex="auto">
      <mat-label>إسم المستند</mat-label>
        <md-input-container>
          <input type="text" formControlName="certificateName" matInput required>
        </md-input-container>
      <mat-icon matSuffix [icIcon]="icSmartDocument"></mat-icon>
    </mat-form-field>
  </div> -->

  <!-- <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

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

</div> 

</mat-dialog-content>
-->
<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
  <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>حفظ</button>
</mat-dialog-actions>

  `,
  styleUrls: ['./tebyan-level1.component.scss']
})


export class DialogAddNewCourse implements OnInit {
  icClose = icClose
  icSmartDocument = icSmartDocument;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form = this.fb.group({
    courceName:  new FormControl(null),
    beneficiaryType:  new FormControl(null, [Validators.required]),
    level:  new FormControl(null, [Validators.required]),
    sex:  new FormControl(null, [Validators.required]),
    coache:  new FormControl(null, [Validators.required]),
    typePlace:  new FormControl(null, [Validators.required]),
    certificateModels1:  new FormControl(null, [Validators.required]),
    certificateModels2:  new FormControl(null, [Validators.required]),
    certificateModels3:  new FormControl(null, [Validators.required]),

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
  sex: any;
  coache: any;
  typePlace: any;
  certificateModels: any;

  startTime: Date;
  trainingPlace: string;
  hours: number;
  days: number;
  test1: Date;
  test2: Date;
  oralTest: Date;
  writtenTest: Date;
  courcesDates: Array<Date>;



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
          sex{
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

     
     this.sex = data.mexCourseTables.sex.filter((value, index, array)=>{
      return parseInt(value.id) == 1 || parseInt(value.id) == 4
     })
    this.coache = data.mexCourseTables.coache
    this.typePlace = data.mexCourseTables.typePlace
    this.certificateModels = data.mexCourseTables.certificateModels

    this.form = this.fb.group({
      courceName:  new FormControl(null),
      beneficiaryType:  new FormControl(null, [Validators.required]),
      level:  new FormControl(null, [Validators.required]),
      sex:  new FormControl(null, [Validators.required]),
      coache:  new FormControl(null, [Validators.required]),
      typePlace:  new FormControl(null, [Validators.required]),
      certificateModels1:  new FormControl(null, [Validators.required]),
      certificateModels2:  new FormControl(null, [Validators.required]),
      certificateModels3:  new FormControl(null, [Validators.required]),

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


  savaData(){

    console.log(this.form.invalid)
    console.log('uID', parseInt(this.data.userID))
    console.log('courseName', parseInt(this.form.get('sex').value == '1'? '5':'6'))
    console.log('beneficiaryType', parseInt(this.form.get('beneficiaryType').value))
    console.log('level',  parseInt(this.form.get('level').value))
    console.log('sex',  parseInt(this.form.get('sex').value))
    console.log('coache',  parseInt(this.form.get('coache').value))
    console.log('typePlace',  parseInt(this.form.get('typePlace').value))
    console.log('certificateModels1',  parseInt(this.form.get('certificateModels1').value))
    console.log('certificateModels2',  parseInt(this.form.get('certificateModels2').value))
    console.log('certificateModels3',  parseInt(this.form.get('certificateModels3').value))

    console.log(this.form)
    
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