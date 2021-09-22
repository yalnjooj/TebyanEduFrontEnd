import { Component, Inject, Input, OnInit, ViewChild, AfterContentInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDataFormDialog } from 'src/app/custom-layout/member/pages/apps/social/social-profile/social-profile.component';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icEye from '@iconify/icons-ic/remove-red-eye';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFocus from '@iconify/icons-ic/center-focus-strong';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icSmartemail from '@iconify/icons-ic/twotone-email';
import icModule from '@iconify/icons-ic/view-module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

  @Component({
    selector: 'vex-teachers-data',
    templateUrl: './teachers-data.component.html',
    styleUrls: ['../../tebyan-level1.component.scss']
  })
  export class TeachersDataComponent implements OnInit, OnDestroy {

    @Input('courseNo') courseNo: string;
    @Input('level') levelNumber: number;
  
  icClose = icClose
  icEye = icEye
  icSearch = icSearch
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
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


  public dateValusesDate: Date[] = [];
  show = false;

  start_time: any;
  hours: any;

  courceName: any;

  beneficiaryType: any;
  beneficiaryTypeName: any;

  level: any;

  catagory: any;
  catagoryName: any;
  catagoryId: any;

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



  displayedColumns: string[] = ['id', 'name', 'catagory', 'nationality', 'birthDay', 'qualification', 'specialization', 'memorizing', 'tajwid', 'experience', 'idnfcation', 'phone', 'email', 'edit'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }
    
    private unsubscription0: Subscription;

    ngOnDestroy(): void {
      this.unsubscription0.unsubscribe()   
    }



  ngOnInit(): void {
    
   this.unsubscription0 = this.apollo.watchQuery({
      query: gql`
          query coursesdetails($coursesId: Int!) {
            coursesdetails(coursesId: $coursesId) {
              id
              studentId
              specialization
              memorizing
              tajwid
              experience

              case_Letters
              direct_Reading
              spelling
              recitation
              teaching_Methods

              short_test1
              short_test2

              written_test

              createdAt
              updatedAt
              
              coursesId
              catagoryId
              catagory{
                id
                name
              }
              qualification{
                id
                qualification
              }
              email{
                _01_personalId
                email
              }
              phone{
                _01_personalId
                phone
              }
              birthDay{
                id
                birthDay
              }
              nationality{
                id
                nationalityMaleAr
                nationalityFemaleAr
              }
              countryOfResidence{
                id
                countrylityNameAr
              }
              region{
                id
                nameAr
              }
              city{
                id
                nameAr
              }
              neighborhood{
                id
                nameAr
              }
              student{
                id
                name_AR
                idnfcation
              }
              sex{
                id
                sex
            }
            }
        }
        `,
        variables: {
          coursesId: parseInt(this.courseNo)
        }
    }).valueChanges.subscribe( async ( {data}: any ) => {

        let e: any[] = [];

      data.coursesdetails.forEach((element, index) => {

        e.push({
          id: index+1,
          courseDetailsId: element.id,
          name: element.student.name_AR,
          catagory: element.catagory.name,
          nationality: element.sex.id == 2? element.nationality.nationalityFemaleAr : element.nationality.nationalityMaleAr,
          birthDay: element.birthDay.birthDay,
          qualification: element.qualification.qualification,
          specialization: element.specialization,
          memorizing: element.memorizing,
          tajwid: element.tajwid? 'ملم':'غير ملم',
          experience: element.experience,
          idnfcation: element.student.idnfcation,
          phone: element.phone.phone,
          email: element.email.email,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,

          caseLetters: element.case_Letters,
          directReading: element.direct_Reading,
          spelling: element.spelling,
          recitation: element.recitation,
          teachingMethods: element.teaching_Methods,

          shortTest1: element.short_test1,
          shortTest2: element.short_test2,

          writtenTest: element.written_test

        })

      });

      this.dataSource = new MatTableDataSource(e);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;
  addNewStudent(){

      this.afterClosed = this.dialog.open(AddNewStudent,{
          disableClose: true,
          width: '100vw',
          maxWidth: '100vw',
          data: {courseNo: this.courseNo, level: this.levelNumber}
        }).afterClosed().subscribe(result => {
          if(JSON.parse(result)) this.ngOnInit()

        })
  }

  editCourse(idnfcation){
    
    this.dialog.open(AddEditStudent,{
      disableClose: true,
      width: '100vw',
      maxWidth: '100vw',
      data: {idnfcation, courseNo: this.courseNo, level: this.data.level}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    });

  }
  deleteCourse(courseDetailsId){
    
    this.dialog.open(ConformDialogComponent,{
      disableClose: false,
      width: '300px',
      data: {hint: 'حذف', message: 'هل تريد حذف المتدرب من هذه الدورة؟'}
    }).afterClosed().subscribe(result => {

      if(!JSON.parse(result)) return

          this.ngxSpinnerService.show()

          this.apollo.mutate({
            mutation: gql`
              mutation deleteP01_personal($id: Int!){
                deleteP01_personal(id: $id)
              }
              `,
              variables:{
                id: parseInt(courseDetailsId)
              }
          }).subscribe(( {data}: any ) => {
            this.ngOnInit()
          this.ngxSpinnerService.hide()
            
          this.snackBar.open('تم حذف المتدرب','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      
        })
    }); 

  }

}




/*--------------------------------new --------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/

import { loadCldr, L10n, setCulture} from '@syncfusion/ej2-base';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { SortPipe } from "src/@vex/pipes/sort.pipe";
import { ConformDialogComponent } from 'src/app/custom-layout/member/layout/dialogs/conformDialog/conform.dialog.component';


@Component({
  selector: 'vex-addNewStudent',
  template: `
    <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>{{status?.message || 'أدخل رقم الهوية / الجواز'}}</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>


    <mat-dialog-content id="form-element" class="form-vertical" [formGroup]="form" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>البيانات الشخصية</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list><br>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>رقم الهوية</mat-label>
        <input type="text" matInput id="id" formControlName="id"  (keyup)="searchId($event)" required>
        <mat-error *ngIf="form.get('id').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الاسم بالعربي</mat-label>
        <input type="text" matInput formControlName="nameAr" required>
        <mat-error *ngIf="form.get('nameAr').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الاسم بالإنجليزي</mat-label>
        <input type="text" matInput formControlName="nameEn" required>
        <mat-error *ngIf="form.get('nameEn').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الجنس</mat-label>
        <mat-select formControlName="sex">
          <mat-option dir="rtl" required *ngFor="let data of sex" [value]="data.id" (click)="nationalitiesFunc(data.id)">{{data.sex}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('sex').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المهنة</mat-label>
        <mat-select formControlName="catagory">
          <mat-option dir="rtl" required *ngFor="let data of catagory" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('catagory').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      </div>

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>رقم الجوال</mat-label>
        <md-input-container>
          <input type="text" matInput formControlName="phone" required>
        </md-input-container>
        <mat-icon matSuffix [icIcon]="icSmartphone"></mat-icon>
        <mat-error *ngIf="form.get('phone').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
      
      <mat-form-field fxFlex="90px">
      <mat-label>اختر مفتاح الدولة</mat-label>
        <mat-select formControlName="companyPhoneKey" required>
          <mat-option dir="rtl" *ngFor="let infoo of countries" [value]="infoo.id">
            <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{infoo.ISO2Code}}.png" />
            {{infoo.PHONECODE}}+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>البريد الإلكتروني</mat-label>
        <md-input-container>
          <input type="email" matInput formControlName="email" required>
        </md-input-container>
        <mat-icon [icIcon]="icSmartemail" class="mr-2" matPrefix></mat-icon>  
        <mat-error *ngIf="form.get('email').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <ejs-datepicker #birthDay id='birthDay' formControlName="birthDay" floatLabelType='Auto' fxFlex="auto" placeholder="تاريخ الميلاد" enableRtl='true' locale='ar'></ejs-datepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>الجنسية</mat-label>
        <mat-select formControlName="nationality">
          <mat-option dir="rtl" required *ngFor="let data of nationalities | sort:'asc':'nationality'" [value]="data.id">
          <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{data.ISO2Code}}.png" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.nationality}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('nationality').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>بلد الإقامة</mat-label>
        <mat-select formControlName="residence">
          <mat-option dir="rtl" required *ngFor="let data of countries | sort:'asc':'countrylityNameAr'" (click)="residenceCountryId(data.id)" [value]="data.id">
          <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{data.ISO2Code}}.png" />  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.countrylityNameAr}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('residence').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      </div>

      <div fxLayout="row" *ngIf="show" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>المنطقة</mat-label>
        <mat-select formControlName="region">
          <mat-option dir="rtl" required *ngFor="let data of provinces | sort:'asc':'nameAr'" (click)="citiesFunc(data.id)" [value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('region').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المدينة</mat-label>
        <mat-select formControlName="city">
          <mat-option dir="rtl" required *ngFor="let data of cities | sort:'asc':'nameAr'"  (click)="neighborhoodFunc(data.id)" [value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('city').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الحي</mat-label>
        <mat-select formControlName="neighborhood">
          <mat-option dir="rtl" required *ngFor="let data of neighborhoods | sort:'asc':'nameAr'"[value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('neighborhood').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

    </div>



    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list><br>
    

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>المؤهل</mat-label>
        <mat-select formControlName="qualification">
          <mat-option dir="rtl" required *ngFor="let data of qualifications" [value]="data.id">{{data.qualification}}</mat-option>
        </mat-select>        <mat-error *ngIf="form.get('qualification').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>التخصص</mat-label>
        <input type="text" matInput formControlName="specialization" required>
        <mat-error *ngIf="form.get('specialization').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>مقدار الحفظ</mat-label>
        <input type="number" matInput formControlName="memorizing" required>
        <mat-error *ngIf="form.get('memorizing').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الإلمام بأحكام التجويد</mat-label>
        <mat-select formControlName="tajwed">
        <mat-option dir="rtl" required value="true">ملم ـة</mat-option>
        <mat-option dir="rtl" required value="false">غير ملم ـة</mat-option>
        </mat-select>        <mat-error *ngIf="form.get('tajwed').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>سنوات الخبرة</mat-label>
        <input type="number" matInput formControlName="expertise" required>
        <mat-error *ngIf="form.get('expertise').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

    </div>

    </mat-dialog-content>

    <mat-dialog-actions align="start">
      <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
      <button mat-raised-button color="primary" [disabled]="savaButton" (click)="savaData()">حفظ</button>
      <button mat-raised-button (click)="form.reset(); show = false">مسح</button>
    </mat-dialog-actions>
  `,
      styleUrls: ['../../tebyan-level1.component.scss']
})
export class AddNewStudent implements OnInit, AfterContentInit, OnDestroy {

  formObject: FormValidator;


icSmartphone = icSmartphone
icClose = icClose
icSmartemail = icSmartemail
icEye = icEye
icSearch = icSearch
icPhone = icPhone;
icMail = icMail;
icMap = icMap;
icEdit = icEdit;
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


public dateValusesDate: Date[] = [];
show = false;
savaButton = false;

start_time: any;
hours: any;

courceName: any;

beneficiaryType: any;
beneficiaryTypeName: any;

level: any;
levelNumber: any;

catagoryName: any;
catagoryId: any;

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

catagory: any;
sex: any;
qualifications: any;

nationalities: Array<any> = [];
countries: any; 
provinces: any
cities: any;
neighborhoods: any;

displayedColumns: string[] = [];
columnsToDisplay: string[];
dataSource: any;

form: FormGroup;
isRegested: number[] = [];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild('id') id: ElementRef;

status: any;
constructor(
  public renderer: Renderer2,
  private sortPipe: SortPipe,
  public dialog: MatDialog,
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }
  
  private unsubscription0: Subscription;
  private unsubscription1: Subscription;
  private unsubscription2: Subscription;
  private unsubscription3: Subscription;
  private unsubscription4: Subscription;

  ngOnDestroy(): void {
    this.unsubscription0?.unsubscribe()
    this.unsubscription1?.unsubscribe()
    this.unsubscription2?.unsubscribe()
    this.unsubscription3?.unsubscribe()
    this.unsubscription4?.unsubscribe()
  
  }

  ngAfterContentInit(): void {
    this.renderer.selectRootElement('#id').focus();
  }





ngOnInit(): void {

  let options: FormValidatorModel = {
    rules: {
        'birthDay': { required: [true, "Value is required"] }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
          inputElement.parentElement.parentElement.appendChild(errorElement);
      }
    };
  this.formObject = new FormValidator('#form-element', options);

  L10n.load({
    'ar': {
    'datepicker': {
    placeholder:"اختر التاريخ",
    today:"اليوم"
        }
      }
  });


  this.unsubscription0 = this.apollo.watchQuery({
    query: gql`
        query mexCourseTables {
          mexCourseTables {
            sex{
              id
              sex
            }
            catagory{
              id
              name
            }
            countries{
            id
            countrylityNameAr
            nationalityMaleAr
            nationalityFemaleAr
            PHONECODE
            ISO2Code
          }
            qualifications{
              id
              qualification
            }
        }
      }
      `
  }).valueChanges.subscribe( async ( {data}: any ) => {
    
  this.sex =  data.mexCourseTables.sex
  this.qualifications = data.mexCourseTables.qualifications

  this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
    return !(parseInt(value.id) == 1 || parseInt(value.id) == 2)
   })

  
  this.countries = data.mexCourseTables.countries

  
  })


  this.form = this.fb.group({      
    id:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    nameAr:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    nameEn:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    catagory:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    nationality:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    birthDay:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    qualification:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    sex:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    phone: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[0-9]*')]),
    companyPhoneKey:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    email:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    residence:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    specialization:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    memorizing:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    tajwed:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    expertise:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    region:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    city:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    neighborhood:  new FormControl({ value: null, disabled: true }, [Validators.required]),
  });

}


searchId(event: Event) {
  this.unsubscription0.unsubscribe()

  const filterValue = (event.target as HTMLInputElement).value;

  if(filterValue.trim().length <= 6 || filterValue.trim().length > 15) {
 
    this.form.get('nameAr').reset()
    this.form.get('nameEn').reset()
    this.form.get('catagory').reset()
    this.form.get('nationality').reset()
    this.form.get('birthDay').reset()
    this.form.get('qualification').reset()
    this.form.get('sex').reset()
    this.form.get('phone').reset()
    this.form.get('companyPhoneKey').reset()
    this.form.get('email').reset()
    this.form.get('residence').reset()
    this.form.get('specialization').reset()
    this.form.get('memorizing').reset()
    this.form.get('tajwed').reset()
    this.form.get('expertise').reset()
    this.form.get('region').reset()
    this.form.get('city').reset()
    this.form.get('neighborhood').reset()
  
    this.form.controls['nameAr'].disable({onlySelf: true})
    this.form.controls['nameEn'].disable({onlySelf: true})
    this.form.controls['catagory'].disable({onlySelf: true})
    this.form.controls['nationality'].disable({onlySelf: true})
    this.form.controls['birthDay'].disable({onlySelf: true})
    this.form.controls['qualification'].disable({onlySelf: true})
    this.form.controls['sex'].disable({onlySelf: true})
    this.form.controls['phone'].disable({onlySelf: true})
    this.form.controls['companyPhoneKey'].disable({onlySelf: true})
    this.form.controls['email'].disable({onlySelf: true})
    this.form.controls['residence'].disable({onlySelf: true})
    this.form.controls['specialization'].disable({onlySelf: true})
    this.form.controls['memorizing'].disable({onlySelf: true})
    this.form.controls['tajwed'].disable({onlySelf: true})
    this.form.controls['expertise'].disable({onlySelf: true})
    this.form.controls['region'].disable({onlySelf: true})
    this.form.controls['city'].disable({onlySelf: true})
    this.form.controls['neighborhood'].disable({onlySelf: true})
    
    this.isRegested =[]
    this.status = {status: null, message: 'أدخل رقم الهوية / الجواز'}

  } else {


    this.ngxSpinnerService.show()

   this.unsubscription1 = this.apollo.watchQuery({
      query: gql`
        query searchStudentId($identification: ID! $courseId: Int $level: Int){
          searchStudentId(identification: $identification courseId: $courseId level: $level){
            isRegested
            coursesDetails{
  
              specialization
              memorizing
              tajwid
              experience             
              catagoryId
              qualificationId
            }
            countryOfPersonal{
              nationality_id
              country_of_residence_id
            }
            citieANDregion{
              regionId
              cityId
              neighborhoodId
            }
            basec{
              id
              idnfcation
              name_AR
              name_EN
              sex_id
            }
            phone{
              _01_personalId
              phone
              phone_KEY
            }
            email{
              email
            }
            birthDay{
              birthDay
            }
            status
          }
        }
        `,
        variables:{
          identification: filterValue.trim(),
          courseId: parseInt(this.data.courseNo),
          level: parseInt(this.data.level)
        }
    }).valueChanges.subscribe(( {data}: any ) => {
      
      this.isRegested = data?.searchStudentId.isRegested

      switch (data?.searchStudentId.status) {

        case undefined:

        this.form.controls['nameAr'].reset()
        this.form.controls['nameEn'].reset()
        this.form.controls['catagory'].reset()
        this.form.controls['nationality'].reset()
        this.form.controls['birthDay'].reset()
        this.form.controls['qualification'].reset()
        this.form.controls['sex'].reset()
        this.form.controls['phone'].reset()
        this.form.controls['companyPhoneKey'].reset()
        this.form.controls['email'].reset()
        this.form.controls['residence'].reset()
        this.form.controls['specialization'].reset()
        this.form.controls['memorizing'].reset()
        this.form.controls['tajwed'].reset()
        this.form.controls['expertise'].reset()
        this.form.controls['region'].reset()
        this.form.controls['city'].reset()
        this.form.controls['neighborhood'].reset()

        this.form.controls['nameAr'].enable({onlySelf: true})
        this.form.controls['nameEn'].enable({onlySelf: true})
        this.form.controls['catagory'].enable({onlySelf: true})
        this.form.controls['nationality'].enable({onlySelf: true})
        this.form.controls['birthDay'].enable({onlySelf: true})
        this.form.controls['qualification'].enable({onlySelf: true})
        this.form.controls['sex'].enable({onlySelf: true})
        this.form.controls['phone'].enable({onlySelf: true})
        this.form.controls['companyPhoneKey'].enable({onlySelf: true})
        this.form.controls['email'].enable({onlySelf: true})
        this.form.controls['residence'].enable({onlySelf: true})
        this.form.controls['specialization'].enable({onlySelf: true})
        this.form.controls['memorizing'].enable({onlySelf: true})
        this.form.controls['tajwed'].enable({onlySelf: true})
        this.form.controls['expertise'].enable({onlySelf: true})
        this.form.controls['region'].enable({onlySelf: true})
        this.form.controls['city'].enable({onlySelf: true})
        this.form.controls['neighborhood'].enable({onlySelf: true})

        this.form.get('region').reset()
        this.form.get('city').reset()
        this.form.get('neighborhood').reset()
        
        this.form.controls['region'].setErrors(null)
        this.form.controls['city'].setErrors(null)
        this.form.controls['neighborhood'].setErrors(null)

        this.cities = [];
        this.neighborhoods = [];
        this.show = false
        this.status = {status: 'new', message: 'تسجيل جديد'}
        this.savaButton = false;

        
          this.snackBar.open('تسجيل جديد','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        

          break;
        
        case true:
          
        this.savaButton = true;

        this.form.get('nameAr').reset()
        this.form.get('nameEn').reset()
        this.form.get('catagory').reset()
        this.form.get('nationality').reset()
        this.form.get('birthDay').reset()
        this.form.get('qualification').reset()
        this.form.get('sex').reset()
        this.form.get('phone').reset()
        this.form.get('companyPhoneKey').reset()
        this.form.get('email').reset()
        this.form.get('residence').reset()
        this.form.get('specialization').reset()
        this.form.get('memorizing').reset()
        this.form.get('tajwed').reset()
        this.form.get('expertise').reset()
        this.form.get('region').reset()
        this.form.get('city').reset()
        this.form.get('neighborhood').reset()
      
        this.form.controls['nameAr'].disable({onlySelf: true})
        this.form.controls['nameEn'].disable({onlySelf: true})
        this.form.controls['catagory'].disable({onlySelf: true})
        this.form.controls['nationality'].disable({onlySelf: true})
        this.form.controls['birthDay'].disable({onlySelf: true})
        this.form.controls['qualification'].disable({onlySelf: true})
        this.form.controls['sex'].disable({onlySelf: true})
        this.form.controls['phone'].disable({onlySelf: true})
        this.form.controls['companyPhoneKey'].disable({onlySelf: true})
        this.form.controls['email'].disable({onlySelf: true})
        this.form.controls['residence'].disable({onlySelf: true})
        this.form.controls['specialization'].disable({onlySelf: true})
        this.form.controls['memorizing'].disable({onlySelf: true})
        this.form.controls['tajwed'].disable({onlySelf: true})
        this.form.controls['expertise'].disable({onlySelf: true})
        this.form.controls['region'].disable({onlySelf: true})
        this.form.controls['city'].disable({onlySelf: true})
        this.form.controls['neighborhood'].disable({onlySelf: true})

        this.status = {status: null, message: 'مسجل بالفعل في هذه الدورة'}
        this.snackBar.open('مسجل بالفعل في هذه الدورة','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

          break;

        case false:

          this.savaButton = false;

        
          
            this.form.controls['nameAr'].enable({onlySelf: true})
            this.form.controls['nameEn'].enable({onlySelf: true})
            this.form.controls['catagory'].enable({onlySelf: true})
            this.form.controls['nationality'].enable({onlySelf: true})
            this.form.controls['birthDay'].enable({onlySelf: true})
            this.form.controls['qualification'].enable({onlySelf: true})
            this.form.controls['sex'].enable({onlySelf: true})
            this.form.controls['phone'].enable({onlySelf: true})
            this.form.controls['companyPhoneKey'].enable({onlySelf: true})
            this.form.controls['email'].enable({onlySelf: true})
            this.form.controls['residence'].enable({onlySelf: true})
            this.form.controls['specialization'].enable({onlySelf: true})
            this.form.controls['memorizing'].enable({onlySelf: true})
            this.form.controls['tajwed'].enable({onlySelf: true})
            this.form.controls['expertise'].enable({onlySelf: true})
 

 

  


          this.status = {status: 'edit', message: 'الرجاء اكمال البيانات'}

          this.residenceCountryId(data.searchStudentId.countryOfPersonal?.country_of_residence_id)
          this.nationalitiesFunc(data.searchStudentId.basec?.sex_id)
  
          this.form.controls['nameAr'].setValue(data.searchStudentId.basec?.name_AR)
          this.form.controls['nameEn'].setValue(data.searchStudentId.basec?.name_EN)
          this.form.controls['catagory'].setValue(data.searchStudentId.coursesDetails?.catagoryId.toString())
          this.form.controls['nationality'].setValue(data.searchStudentId.countryOfPersonal?.nationality_id.toString())
          this.form.controls['birthDay'].setValue(data.searchStudentId.birthDay?.birthDay)
          this.form.controls['qualification'].setValue(data.searchStudentId.coursesDetails?.qualificationId)
          this.form.controls['sex'].setValue(data.searchStudentId?.basec.sex_id.toString())
          this.form.controls['phone'].setValue(data.searchStudentId.phone?.phone)
          this.form.controls['companyPhoneKey'].setValue(data.searchStudentId?.phone.phone_KEY.toString())
          this.form.controls['email'].setValue(data.searchStudentId.email?.email)
          this.form.controls['residence'].setValue(data.searchStudentId.countryOfPersonal?.country_of_residence_id.toString())
          this.form.controls['specialization'].setValue(data.searchStudentId.coursesDetails?.specialization.toString())
          this.form.controls['memorizing'].setValue(data.searchStudentId.coursesDetails?.memorizing)
          this.form.controls['tajwed'].setValue(data.searchStudentId.coursesDetails?.tajwid.toString())
          this.form.controls['expertise'].setValue(data.searchStudentId.coursesDetails?.experience)
          
          this.form.controls['region'].setValue(data.searchStudentId.citieANDregion?.regionId)
  
          this.citiesFunc(data.searchStudentId.citieANDregion?.regionId)
          this.neighborhoodFunc(data.searchStudentId.citieANDregion?.cityId)
  
          this.form.controls['city'].setValue(data.searchStudentId.citieANDregion?.cityId)
          this.form.controls['neighborhood'].setValue(data.searchStudentId.citieANDregion?.neighborhoodId)
  
          this.snackBar.open('الرجاء اكمال البيانات','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          
          break;

      }

      this.ngxSpinnerService.hide()

  })

  }



}

nationalitiesFunc(id){

  switch (parseInt(id)) {

    case 1:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityMaleAr, ISO2Code: element.ISO2Code})
      });
      break;
  
    case 2:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityFemaleAr, ISO2Code: element.ISO2Code})
      });
      break;
  }

}

residenceCountryId(id){

  if(!(parseInt(id) == 187)){

    this.show = false;
    this.form.get('region').reset()
    this.form.get('city').reset()
    this.form.get('neighborhood').reset()
  

    this.form.controls['region'].setErrors(null)
    this.form.controls['city'].setErrors(null)
    this.form.controls['neighborhood'].setErrors(null)
    this.form.get('phone').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[0-9]*')])

  } else {
    this.show = true;
    this.provincesFunc();
    this.form.get('region').setValidators(Validators.required)
    this.form.get('city').setValidators(Validators.required)
    this.form.get('neighborhood').setValidators(Validators.required)
    this.form.controls['region'].enable({onlySelf: true})
    this.form.controls['city'].enable({onlySelf: true})
    this.form.controls['neighborhood'].enable({onlySelf: true})
    this.form.get('phone').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(9), Validators.pattern('[0-9]*')])
    this.cities = [];
    this.neighborhoods = [];
    

  };


}

onFocusOut(): void {
  this.formObject.validate("birthDay")
}

provincesFunc(){

  this.unsubscription2 = this.apollo.watchQuery({
    query: gql`
        query provinces {
          provinces{
            id
            nameAr
          }
      }
      `
  }).valueChanges.subscribe( async ( {data}: any ) => {
    this.provinces = data.provinces;
  })

}

citiesFunc(id){

if(id){
  this.unsubscription3 = this.apollo.watchQuery({
    query: gql`
        query provinceIds($provinceId: ID!) {
          provinceIds(provinceId: $provinceId) {
            id
            nameAr
          }
      }
      `,
      variables: {
        provinceId: parseInt(id)
      }
  }).valueChanges.subscribe( async ( {data}: any ) => {
    this.cities = data.provinceIds
    this.neighborhoods = [];
  })
}

}

neighborhoodFunc(id){

if(id){
  this.unsubscription4 = this.apollo.watchQuery({
    query: gql`
        query neighborhood($cities: ID!) {
          neighborhood(cities: $cities) {
            id
            nameAr
          }
      }
      `,
      variables: {
        cities: parseInt(id)
      }
  }).valueChanges.subscribe( ( {data}: any ) => {
    this.neighborhoods = data.neighborhood
  })
}

}

savaData(){

  if(this.form.invalid) return alert('لم يتم ملئ جميع الحقول !');

  if(!(this.isRegested === undefined || this.isRegested.length == 0)){
    const r = confirm(`تم تسجيل هذا المتدرب لنفس المستوى من قبل، رقم الدورة: ${this.isRegested} هل تريد المتباعة على أي حال؟`)
    if(!r) return
  }
  this.ngxSpinnerService.show()


  this.apollo.mutate({
    mutation: gql`
      mutation createP01_personal($identification: ID! $status: String! $courseId: Int $nameAr: String $nameEn: String $sex: Int $catagoryId: Int $phone: String $companyPhoneKey: Int $email: String $birthDay: Date $nationalityId: Int $residenceId: Int $regionId: Int $cityId: Int $neighborhoodId: Int $qualificationId: Int $specialization: String $memorizing: Int $tajwed: Boolean $expertise: Int){
        createP01_personal(identification: $identification status: $status courseId: $courseId nameAr: $nameAr nameEn: $nameEn sex: $sex catagoryId: $catagoryId phone: $phone companyPhoneKey: $companyPhoneKey email: $email birthDay: $birthDay nationalityId: $nationalityId residenceId: $residenceId regionId: $regionId cityId: $cityId neighborhoodId: $neighborhoodId qualificationId: $qualificationId specialization: $specialization memorizing: $memorizing tajwed: $tajwed expertise: $expertise)
      }
      `,
      variables:{
        identification: this.form.get('id').value,
        status: this.status.status,
        courseId: parseInt(this.data.courseNo),
        nameAr: this.form.get('nameAr').value,
        nameEn:  this.form.get('nameEn').value,
        sex: parseInt(this.form.get('sex').value),
        catagoryId: parseInt(this.form.get('catagory').value),
        phone: this.form.get('phone').value.toString(),
        companyPhoneKey: parseInt(this.form.get('companyPhoneKey').value),
        email: this.form.get('email').value,
        birthDay: this.form.get('birthDay').value,
        nationalityId: parseInt(this.form.get('nationality').value),
        residenceId:parseInt(this.form.get('residence').value),
        regionId: parseInt(this.form.get('region').value),
        cityId: parseInt(this.form.get('city').value),
        neighborhoodId: parseInt(this.form.get('neighborhood').value),
        qualificationId: parseInt(this.form.get('qualification').value),
        specialization: this.form.get('specialization').value,
        memorizing:  parseInt(this.form.get('memorizing').value),
        tajwed: JSON.parse(this.form.get('tajwed').value),
        expertise: parseInt(this.form.get('expertise').value),
    
      }
  }).subscribe(( {data}: any ) => {

    let message: string;

    switch (data.createP01_personal) {

      case 'email':
        message = 'عنوان البريد الإلكتروني موجود، يجب تغييره !!'
        break;

      case 'phone':
        message = 'رقم الجوال موجود، يجب تغييره !!'
        break;

      default:
        message = data.createP01_personal
        this.dialogRef.close(true);
        break;
    }
    
    this.ngxSpinnerService.hide()

    this.snackBar.open(message,'إغلاق', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

})




}



}






/*--------------------------------edit --------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/


@Component({
  selector: 'vex-addEditStudent',
  template: `
    <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>{{status?.message || 'أدخل رقم الهوية / الجواز'}}</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>


    <mat-dialog-content id="form-element" class="form-vertical" [formGroup]="form" class="mat-typography" novalidate>


    <mat-list>
      <mat-list-item><b>البيانات الشخصية</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list><br>

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>رقم الهوية</mat-label>
        <input type="text" matInput id="id" formControlName="id" required>
        <mat-error *ngIf="form.get('id').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الاسم بالعربي</mat-label>
        <input type="text" matInput formControlName="nameAr" required>
        <mat-error *ngIf="form.get('nameAr').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الاسم بالإنجليزي</mat-label>
        <input type="text" matInput formControlName="nameEn" required>
        <mat-error *ngIf="form.get('nameEn').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الجنس</mat-label>
        <mat-select formControlName="sex">
          <mat-option dir="rtl" required *ngFor="let data of sex" [value]="data.id" (click)="nationalitiesFunc(data.id)">{{data.sex}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('sex').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المهنة</mat-label>
        <mat-select formControlName="catagory">
          <mat-option dir="rtl" required *ngFor="let data of catagory" [value]="data.id">{{data.name}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('catagory').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      </div>

      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>رقم الجوال</mat-label>
        <md-input-container>
          <input type="text" matInput formControlName="phone" required>
        </md-input-container>
        <mat-icon matSuffix [icIcon]="icSmartphone"></mat-icon>
        <mat-error *ngIf="form.get('phone').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>
      
      <mat-form-field fxFlex="90px">
      <mat-label>اختر مفتاح الدولة</mat-label>
        <mat-select formControlName="companyPhoneKey" required>
          <mat-option dir="rtl" *ngFor="let infoo of countries" [value]="infoo.id">
            <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{infoo.ISO2Code}}.png" />
            {{infoo.PHONECODE}}+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>البريد الإلكتروني</mat-label>
        <md-input-container>
          <input type="email" matInput formControlName="email" required>
        </md-input-container>
        <mat-icon [icIcon]="icSmartemail" class="mr-2" matPrefix></mat-icon>  
        <mat-error *ngIf="form.get('email').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <ejs-datepicker #birthDay id='birthDay' formControlName="birthDay" floatLabelType='Auto' fxFlex="auto" placeholder="تاريخ الميلاد" enableRtl='true' locale='ar'></ejs-datepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>الجنسية</mat-label>
        <mat-select formControlName="nationality">
          <mat-option dir="rtl" required *ngFor="let data of nationalities | sort:'asc':'nationality'" [value]="data.id">
          <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{data.ISO2Code}}.png" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.nationality}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('nationality').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>بلد الإقامة</mat-label>
        <mat-select formControlName="residence">
          <mat-option dir="rtl" required *ngFor="let data of countries | sort:'asc':'countrylityNameAr'" (click)="residenceCountryId(data.id)" [value]="data.id">
          <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{data.ISO2Code}}.png" />  
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.countrylityNameAr}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('residence').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      </div>

      <div fxLayout="row" *ngIf="show" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>المنطقة</mat-label>
        <mat-select formControlName="region">
          <mat-option dir="rtl" required *ngFor="let data of provinces | sort:'asc':'nameAr'" (click)="citiesFunc(data.id)" [value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('region').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>المدينة</mat-label>
        <mat-select formControlName="city">
          <mat-option dir="rtl" required *ngFor="let data of cities | sort:'asc':'nameAr'"  (click)="neighborhoodFunc(data.id)" [value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('city').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الحي</mat-label>
        <mat-select formControlName="neighborhood">
          <mat-option dir="rtl" required *ngFor="let data of neighborhoods | sort:'asc':'nameAr'"[value]="data.id">{{data.nameAr}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('neighborhood').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

    </div>



    <mat-list>
      <mat-list-item><b>بيانات الدورة</b></mat-list-item>
      <mat-divider></mat-divider>
    </mat-list><br>
    

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>المؤهل</mat-label>
        <mat-select formControlName="qualification">
          <mat-option dir="rtl" required *ngFor="let data of qualifications" [value]="data.id">{{data.qualification}}</mat-option>
        </mat-select>        <mat-error *ngIf="form.get('qualification').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>التخصص</mat-label>
        <input type="text" matInput formControlName="specialization" required>
        <mat-error *ngIf="form.get('specialization').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>مقدار الحفظ</mat-label>
        <input type="number" matInput formControlName="memorizing" required>
        <mat-error *ngIf="form.get('memorizing').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>الإلمام بأحكام التجويد</mat-label>
        <mat-select formControlName="tajwed">
        <mat-option dir="rtl" required value="true">ملم ـة</mat-option>
        <mat-option dir="rtl" required value="false">غير ملم ـة</mat-option>
        </mat-select>        <mat-error *ngIf="form.get('tajwed').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>سنوات الخبرة</mat-label>
        <input type="number" matInput formControlName="expertise" required>
        <mat-error *ngIf="form.get('expertise').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

    </div>

    </mat-dialog-content>

    <mat-dialog-actions align="start">
      <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
      <button mat-raised-button color="primary" [disabled]="savaButton" (click)="updateDate()">تحديث</button>
      <!-- <button mat-raised-button (click)="form.reset(); show = false">مسح</button> -->
    </mat-dialog-actions>
  `,
      styleUrls: ['../../tebyan-level1.component.scss']
})
export class AddEditStudent implements OnInit, AfterContentInit, OnDestroy {

  formObject: FormValidator;


icSmartphone = icSmartphone
icClose = icClose
icSmartemail = icSmartemail
icEye = icEye
icSearch = icSearch
icPhone = icPhone;
icMail = icMail;
icMap = icMap;
icEdit = icEdit;
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


public dateValusesDate: Date[] = [];
show = false;
savaButton = false;

start_time: any;
hours: any;

courceName: any;

beneficiaryType: any;
beneficiaryTypeName: any;

level: any;
levelNumber: any;

catagoryName: any;
catagoryId: any;

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

catagory: any;
sex: any;
qualifications: any;

nationalities: Array<any> = [];
countries: any; 
provinces: any
cities: any;
neighborhoods: any;

displayedColumns: string[] = [];
columnsToDisplay: string[];
dataSource: any;

form: FormGroup;
isRegested: number[] = [];

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild('id') id: ElementRef;

status: any;
constructor(
  public renderer: Renderer2,
  private sortPipe: SortPipe,
  public dialog: MatDialog,
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }
  
  private unsubscription0: Subscription;
  private unsubscription1: Subscription;
  private unsubscription2: Subscription;
  private unsubscription3: Subscription;
  private unsubscription4: Subscription;

  ngOnDestroy(): void {
    this.unsubscription0?.unsubscribe()
    this.unsubscription1?.unsubscribe()
    this.unsubscription2?.unsubscribe()
    this.unsubscription3?.unsubscribe()
    this.unsubscription4?.unsubscribe()
  
  }

  ngAfterContentInit(): void {
    this.renderer.selectRootElement('#id').focus();
  }





ngOnInit(): void {

  let options: FormValidatorModel = {
    rules: {
        'birthDay': { required: [true, "Value is required"] }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
          inputElement.parentElement.parentElement.appendChild(errorElement);
      }
    };
  this.formObject = new FormValidator('#form-element', options);

  L10n.load({
    'ar': {
    'datepicker': {
    placeholder:"اختر التاريخ",
    today:"اليوم"
        }
      }
  });
    this.ngxSpinnerService.show()


  this.unsubscription0 = this.apollo.watchQuery({
    query: gql`
        query mexCourseTables {
          mexCourseTables {
            sex{
              id
              sex
            }
            catagory{
              id
              name
            }
            countries{
            id
            countrylityNameAr
            nationalityMaleAr
            nationalityFemaleAr
            PHONECODE
            ISO2Code
          }
            qualifications{
              id
              qualification
            }
        }
      }
      `
  }).valueChanges.subscribe( async ( {data}: any ) => {
    
  this.sex =  data.mexCourseTables.sex
  this.qualifications = data.mexCourseTables.qualifications

  this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
    return !(parseInt(value.id) == 1 || parseInt(value.id) == 2)
   })

  
  this.countries = await data.mexCourseTables.countries

  
  })

  this.form = this.fb.group({      
    id:  new FormControl({ value: null, disabled: true }, [Validators.required]),
    nameAr:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    nameEn:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    catagory:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    nationality:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    birthDay:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    qualification:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    sex:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    phone: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[0-9]*')]),
    companyPhoneKey:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    email:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    residence:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    specialization:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    memorizing:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    tajwed:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    expertise:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    region:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    city:  new FormControl({ value: null, disabled: false }, [Validators.required]),
    neighborhood:  new FormControl({ value: null, disabled: false }, [Validators.required]),
  });




   this.unsubscription1 = this.apollo.watchQuery({
      query: gql`
        query searchStudentId($identification: ID! $courseId: Int $level: Int){
          searchStudentId(identification: $identification courseId: $courseId level: $level){
            isRegested
            coursesDetails{
  
              specialization
              memorizing
              tajwid
              experience             
              catagoryId
              qualificationId
            }
            countryOfPersonal{
              nationality_id
              country_of_residence_id
            }
            citieANDregion{
              regionId
              cityId
              neighborhoodId
            }
            basec{
              id
              idnfcation
              name_AR
              name_EN
              sex_id
            }
            phone{
              _01_personalId
              phone
              phone_KEY
            }
            email{
              email
            }
            birthDay{
              birthDay
            }
            status
          }
        }
        `,
        variables:{
          identification: this.data.idnfcation,
          courseId: parseInt(this.data.courseNo),
          level: parseInt(this.data.level)
        }
    }).valueChanges.subscribe(( {data}: any ) => {
      


  


          this.status = {status: 'edit', message: 'الرجاء اكمال البيانات'}

          this.residenceCountryId(data.searchStudentId.countryOfPersonal?.country_of_residence_id)
          this.nationalitiesFunc(data.searchStudentId.basec?.sex_id)
  
          this.form.controls['id'].setValue(data.searchStudentId.basec?.idnfcation)
          this.form.controls['nameAr'].setValue(data.searchStudentId.basec?.name_AR)
          this.form.controls['nameEn'].setValue(data.searchStudentId.basec?.name_EN)
          this.form.controls['catagory'].setValue(data.searchStudentId.coursesDetails?.catagoryId.toString())
          this.form.controls['nationality'].setValue(data.searchStudentId.countryOfPersonal?.nationality_id.toString())
          this.form.controls['birthDay'].setValue(data.searchStudentId.birthDay?.birthDay)
          this.form.controls['qualification'].setValue(data.searchStudentId.coursesDetails?.qualificationId)
          this.form.controls['sex'].setValue(data.searchStudentId?.basec.sex_id.toString())
          this.form.controls['phone'].setValue(data.searchStudentId.phone?.phone)
          this.form.controls['companyPhoneKey'].setValue(data.searchStudentId?.phone.phone_KEY.toString())
          this.form.controls['email'].setValue(data.searchStudentId.email?.email)
          this.form.controls['residence'].setValue(data.searchStudentId.countryOfPersonal?.country_of_residence_id.toString())
          this.form.controls['specialization'].setValue(data.searchStudentId.coursesDetails?.specialization.toString())
          this.form.controls['memorizing'].setValue(data.searchStudentId.coursesDetails?.memorizing)
          this.form.controls['tajwed'].setValue(data.searchStudentId.coursesDetails?.tajwid.toString())
          this.form.controls['expertise'].setValue(data.searchStudentId.coursesDetails?.experience)
          
          this.form.controls['region'].setValue(data.searchStudentId.citieANDregion?.regionId)
  
          this.citiesFunc(data.searchStudentId.citieANDregion?.regionId)
          this.neighborhoodFunc(data.searchStudentId.citieANDregion?.cityId)
  
          this.form.controls['city'].setValue(data.searchStudentId.citieANDregion?.cityId)
          this.form.controls['neighborhood'].setValue(data.searchStudentId.citieANDregion?.neighborhoodId)
  
          this.snackBar.open('الرجاء اكمال البيانات','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          
      

      

      this.ngxSpinnerService.hide()

  })

  


  
  
}


searchId(event: Event) {
  this.unsubscription0.unsubscribe()

  const filterValue = (event.target as HTMLInputElement).value;

  if(filterValue.trim().length <= 6 || filterValue.trim().length > 15) {
 
    this.form.get('nameAr').reset()
    this.form.get('nameEn').reset()
    this.form.get('catagory').reset()
    this.form.get('nationality').reset()
    this.form.get('birthDay').reset()
    this.form.get('qualification').reset()
    this.form.get('sex').reset()
    this.form.get('phone').reset()
    this.form.get('companyPhoneKey').reset()
    this.form.get('email').reset()
    this.form.get('residence').reset()
    this.form.get('specialization').reset()
    this.form.get('memorizing').reset()
    this.form.get('tajwed').reset()
    this.form.get('expertise').reset()
    this.form.get('region').reset()
    this.form.get('city').reset()
    this.form.get('neighborhood').reset()
  
    this.form.controls['nameAr'].disable({onlySelf: true})
    this.form.controls['nameEn'].disable({onlySelf: true})
    this.form.controls['catagory'].disable({onlySelf: true})
    this.form.controls['nationality'].disable({onlySelf: true})
    this.form.controls['birthDay'].disable({onlySelf: true})
    this.form.controls['qualification'].disable({onlySelf: true})
    this.form.controls['sex'].disable({onlySelf: true})
    this.form.controls['phone'].disable({onlySelf: true})
    this.form.controls['companyPhoneKey'].disable({onlySelf: true})
    this.form.controls['email'].disable({onlySelf: true})
    this.form.controls['residence'].disable({onlySelf: true})
    this.form.controls['specialization'].disable({onlySelf: true})
    this.form.controls['memorizing'].disable({onlySelf: true})
    this.form.controls['tajwed'].disable({onlySelf: true})
    this.form.controls['expertise'].disable({onlySelf: true})
    this.form.controls['region'].disable({onlySelf: true})
    this.form.controls['city'].disable({onlySelf: true})
    this.form.controls['neighborhood'].disable({onlySelf: true})
    
    this.isRegested =[]
    this.status = {status: null, message: 'أدخل رقم الهوية / الجواز'}

  } else {


    this.ngxSpinnerService.show()

   this.unsubscription1 = this.apollo.watchQuery({
      query: gql`
        query searchStudentId($identification: ID! $courseId: Int $level: Int){
          searchStudentId(identification: $identification courseId: $courseId level: $level){
            isRegested
            coursesDetails{
  
              specialization
              memorizing
              tajwid
              experience             
              catagoryId
              qualificationId
            }
            countryOfPersonal{
              nationality_id
              country_of_residence_id
            }
            citieANDregion{
              regionId
              cityId
              neighborhoodId
            }
            basec{
              id
              idnfcation
              name_AR
              name_EN
              sex_id
            }
            phone{
              _01_personalId
              phone
              phone_KEY
            }
            email{
              email
            }
            birthDay{
              birthDay
            }
            status
          }
        }
        `,
        variables:{
          identification: this.data.idnfcation,
          courseId: parseInt(this.data.courseNo),
          level: parseInt(this.data.level)
        }
    }).valueChanges.subscribe(( {data}: any ) => {
      
      this.isRegested = data?.searchStudentId.isRegested

      switch (data?.searchStudentId.status) {

        case undefined:

        this.form.controls['nameAr'].reset()
        this.form.controls['nameEn'].reset()
        this.form.controls['catagory'].reset()
        this.form.controls['nationality'].reset()
        this.form.controls['birthDay'].reset()
        this.form.controls['qualification'].reset()
        this.form.controls['sex'].reset()
        this.form.controls['phone'].reset()
        this.form.controls['companyPhoneKey'].reset()
        this.form.controls['email'].reset()
        this.form.controls['residence'].reset()
        this.form.controls['specialization'].reset()
        this.form.controls['memorizing'].reset()
        this.form.controls['tajwed'].reset()
        this.form.controls['expertise'].reset()
        this.form.controls['region'].reset()
        this.form.controls['city'].reset()
        this.form.controls['neighborhood'].reset()

        this.form.controls['nameAr'].enable({onlySelf: true})
        this.form.controls['nameEn'].enable({onlySelf: true})
        this.form.controls['catagory'].enable({onlySelf: true})
        this.form.controls['nationality'].enable({onlySelf: true})
        this.form.controls['birthDay'].enable({onlySelf: true})
        this.form.controls['qualification'].enable({onlySelf: true})
        this.form.controls['sex'].enable({onlySelf: true})
        this.form.controls['phone'].enable({onlySelf: true})
        this.form.controls['companyPhoneKey'].enable({onlySelf: true})
        this.form.controls['email'].enable({onlySelf: true})
        this.form.controls['residence'].enable({onlySelf: true})
        this.form.controls['specialization'].enable({onlySelf: true})
        this.form.controls['memorizing'].enable({onlySelf: true})
        this.form.controls['tajwed'].enable({onlySelf: true})
        this.form.controls['expertise'].enable({onlySelf: true})
        this.form.controls['region'].enable({onlySelf: true})
        this.form.controls['city'].enable({onlySelf: true})
        this.form.controls['neighborhood'].enable({onlySelf: true})

        this.form.get('region').reset()
        this.form.get('city').reset()
        this.form.get('neighborhood').reset()
        
        this.form.controls['region'].setErrors(null)
        this.form.controls['city'].setErrors(null)
        this.form.controls['neighborhood'].setErrors(null)

        this.cities = [];
        this.neighborhoods = [];
        this.show = false
        this.status = {status: 'new', message: 'تسجيل جديد'}
        this.savaButton = false;

        
          this.snackBar.open('تسجيل جديد','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        

          break;
        
        case true:
          
        this.savaButton = true;

        this.form.get('nameAr').reset()
        this.form.get('nameEn').reset()
        this.form.get('catagory').reset()
        this.form.get('nationality').reset()
        this.form.get('birthDay').reset()
        this.form.get('qualification').reset()
        this.form.get('sex').reset()
        this.form.get('phone').reset()
        this.form.get('companyPhoneKey').reset()
        this.form.get('email').reset()
        this.form.get('residence').reset()
        this.form.get('specialization').reset()
        this.form.get('memorizing').reset()
        this.form.get('tajwed').reset()
        this.form.get('expertise').reset()
        this.form.get('region').reset()
        this.form.get('city').reset()
        this.form.get('neighborhood').reset()
      
        this.form.controls['nameAr'].disable({onlySelf: true})
        this.form.controls['nameEn'].disable({onlySelf: true})
        this.form.controls['catagory'].disable({onlySelf: true})
        this.form.controls['nationality'].disable({onlySelf: true})
        this.form.controls['birthDay'].disable({onlySelf: true})
        this.form.controls['qualification'].disable({onlySelf: true})
        this.form.controls['sex'].disable({onlySelf: true})
        this.form.controls['phone'].disable({onlySelf: true})
        this.form.controls['companyPhoneKey'].disable({onlySelf: true})
        this.form.controls['email'].disable({onlySelf: true})
        this.form.controls['residence'].disable({onlySelf: true})
        this.form.controls['specialization'].disable({onlySelf: true})
        this.form.controls['memorizing'].disable({onlySelf: true})
        this.form.controls['tajwed'].disable({onlySelf: true})
        this.form.controls['expertise'].disable({onlySelf: true})
        this.form.controls['region'].disable({onlySelf: true})
        this.form.controls['city'].disable({onlySelf: true})
        this.form.controls['neighborhood'].disable({onlySelf: true})

        this.status = {status: null, message: 'مسجل بالفعل في هذه الدورة'}
        this.snackBar.open('مسجل بالفعل في هذه الدورة','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

          break;

        case false:

          this.savaButton = false;

        
          
            this.form.controls['nameAr'].enable({onlySelf: true})
            this.form.controls['nameEn'].enable({onlySelf: true})
            this.form.controls['catagory'].enable({onlySelf: true})
            this.form.controls['nationality'].enable({onlySelf: true})
            this.form.controls['birthDay'].enable({onlySelf: true})
            this.form.controls['qualification'].enable({onlySelf: true})
            this.form.controls['sex'].enable({onlySelf: true})
            this.form.controls['phone'].enable({onlySelf: true})
            this.form.controls['companyPhoneKey'].enable({onlySelf: true})
            this.form.controls['email'].enable({onlySelf: true})
            this.form.controls['residence'].enable({onlySelf: true})
            this.form.controls['specialization'].enable({onlySelf: true})
            this.form.controls['memorizing'].enable({onlySelf: true})
            this.form.controls['tajwed'].enable({onlySelf: true})
            this.form.controls['expertise'].enable({onlySelf: true})
 

 

  


          this.status = {status: 'edit', message: 'الرجاء اكمال البيانات'}

          this.residenceCountryId(data.searchStudentId.countryOfPersonal?.country_of_residence_id)
          this.nationalitiesFunc(data.searchStudentId.basec?.sex_id)
  
          this.form.controls['nameAr'].setValue(data.searchStudentId.basec?.name_AR)
          this.form.controls['nameEn'].setValue(data.searchStudentId.basec?.name_EN)
          this.form.controls['catagory'].setValue(data.searchStudentId.coursesDetails?.catagoryId.toString())
          this.form.controls['nationality'].setValue(data.searchStudentId.countryOfPersonal?.nationality_id.toString())
          this.form.controls['birthDay'].setValue(data.searchStudentId.birthDay?.birthDay)
          this.form.controls['qualification'].setValue(data.searchStudentId.coursesDetails?.qualificationId)
          this.form.controls['sex'].setValue(data.searchStudentId?.basec.sex_id.toString())
          this.form.controls['phone'].setValue(data.searchStudentId.phone?.phone)
          this.form.controls['companyPhoneKey'].setValue(data.searchStudentId?.phone.phone_KEY.toString())
          this.form.controls['email'].setValue(data.searchStudentId.email?.email)
          this.form.controls['residence'].setValue(data.searchStudentId.countryOfPersonal?.country_of_residence_id.toString())
          this.form.controls['specialization'].setValue(data.searchStudentId.coursesDetails?.specialization.toString())
          this.form.controls['memorizing'].setValue(data.searchStudentId.coursesDetails?.experience)
          this.form.controls['tajwed'].setValue(data.searchStudentId.coursesDetails?.tajwid.toString())
          this.form.controls['expertise'].setValue(data.searchStudentId.coursesDetails?.memorizing)
          
          this.form.controls['region'].setValue(data.searchStudentId.citieANDregion?.regionId)
  
          this.citiesFunc(data.searchStudentId.citieANDregion?.regionId)
          this.neighborhoodFunc(data.searchStudentId.citieANDregion?.cityId)
  
          this.form.controls['city'].setValue(data.searchStudentId.citieANDregion?.cityId)
          this.form.controls['neighborhood'].setValue(data.searchStudentId.citieANDregion?.neighborhoodId)
  
          this.snackBar.open('الرجاء اكمال البيانات','إغلاق', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          
          break;

      }

      this.ngxSpinnerService.hide()

  })

  }



}

nationalitiesFunc(id){

  switch (parseInt(id)) {

    case 1:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityMaleAr, ISO2Code: element.ISO2Code})
      });
      break;
  
    case 2:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityFemaleAr, ISO2Code: element.ISO2Code})
      });
      break;
  }

}

residenceCountryId(id){

  if(!(parseInt(id) == 187)){

    this.show = false;
    this.form.get('region').reset()
    this.form.get('city').reset()
    this.form.get('neighborhood').reset()
  

    this.form.controls['region'].setErrors(null)
    this.form.controls['city'].setErrors(null)
    this.form.controls['neighborhood'].setErrors(null)
    this.form.get('phone').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[0-9]*')])

  } else {
    this.show = true;
    this.provincesFunc();
    this.form.get('region').setValidators(Validators.required)
    this.form.get('city').setValidators(Validators.required)
    this.form.get('neighborhood').setValidators(Validators.required)
    this.form.controls['region'].enable({onlySelf: true})
    this.form.controls['city'].enable({onlySelf: true})
    this.form.controls['neighborhood'].enable({onlySelf: true})
    this.form.get('phone').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(9), Validators.pattern('[0-9]*')])
    this.cities = [];
    this.neighborhoods = [];
    

  };


}

onFocusOut(): void {
  this.formObject.validate("birthDay")
}

provincesFunc(){

  this.unsubscription2 = this.apollo.watchQuery({
    query: gql`
        query provinces {
          provinces{
            id
            nameAr
          }
      }
      `
  }).valueChanges.subscribe( async ( {data}: any ) => {
    this.provinces = data.provinces;
  })

}

citiesFunc(id){

if(id){
  this.unsubscription3 = this.apollo.watchQuery({
    query: gql`
        query provinceIds($provinceId: ID!) {
          provinceIds(provinceId: $provinceId) {
            id
            nameAr
          }
      }
      `,
      variables: {
        provinceId: parseInt(id)
      }
  }).valueChanges.subscribe( async ( {data}: any ) => {
    this.cities = data.provinceIds
    this.neighborhoods = [];
  })
}

}

neighborhoodFunc(id){

if(id){
  this.unsubscription4 = this.apollo.watchQuery({
    query: gql`
        query neighborhood($cities: ID!) {
          neighborhood(cities: $cities) {
            id
            nameAr
          }
      }
      `,
      variables: {
        cities: parseInt(id)
      }
  }).valueChanges.subscribe( ( {data}: any ) => {
    this.neighborhoods = data.neighborhood
  })
}

}

updateDate(){

  if(this.form.invalid) return alert('لم يتم ملئ جميع الحقول !');


  this.ngxSpinnerService.show()


  this.apollo.mutate({
    mutation: gql`
      mutation createP01_personal($identification: ID! $status: String! $courseId: Int $nameAr: String $nameEn: String $sex: Int $catagoryId: Int $phone: String $companyPhoneKey: Int $email: String $birthDay: Date $nationalityId: Int $residenceId: Int $regionId: Int $cityId: Int $neighborhoodId: Int $qualificationId: Int $specialization: String $memorizing: Int $tajwed: Boolean $expertise: Int){
        createP01_personal(identification: $identification status: $status courseId: $courseId nameAr: $nameAr nameEn: $nameEn sex: $sex catagoryId: $catagoryId phone: $phone companyPhoneKey: $companyPhoneKey email: $email birthDay: $birthDay nationalityId: $nationalityId residenceId: $residenceId regionId: $regionId cityId: $cityId neighborhoodId: $neighborhoodId qualificationId: $qualificationId specialization: $specialization memorizing: $memorizing tajwed: $tajwed expertise: $expertise)
      }
      `,
      variables:{
        identification: this.form.get('id').value,
        status: 'edit',
        courseId: parseInt(this.data.courseNo),
        nameAr: this.form.get('nameAr').value,
        nameEn:  this.form.get('nameEn').value,
        sex: parseInt(this.form.get('sex').value),
        catagoryId: parseInt(this.form.get('catagory').value),
        phone: this.form.get('phone').value.toString(),
        companyPhoneKey: parseInt(this.form.get('companyPhoneKey').value),
        email: this.form.get('email').value,
        birthDay: this.form.get('birthDay').value,
        nationalityId: parseInt(this.form.get('nationality').value),
        residenceId:parseInt(this.form.get('residence').value),
        regionId: parseInt(this.form.get('region').value),
        cityId: parseInt(this.form.get('city').value),
        neighborhoodId: parseInt(this.form.get('neighborhood').value),
        qualificationId: parseInt(this.form.get('qualification').value),
        specialization: this.form.get('specialization').value,
        memorizing:  parseInt(this.form.get('memorizing').value),
        tajwed: JSON.parse(this.form.get('tajwed').value),
        expertise: parseInt(this.form.get('expertise').value),
    
      }
  }).subscribe(( {data}: any ) => {

    let message: string;

    switch (data.createP01_personal) {

      case 'email':
        message = 'عنوان البريد الإلكتروني موجود، يجب تغييره !!'
        break;

      case 'phone':
        message = 'رقم الجوال موجود، يجب تغييره !!'
        break;

      default:
        message = 'تم تحديث البيانات'
        this.dialogRef.close(true);
        break;
    }
    
    this.ngxSpinnerService.hide()

    this.snackBar.open(message,'إغلاق', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

})




}



}