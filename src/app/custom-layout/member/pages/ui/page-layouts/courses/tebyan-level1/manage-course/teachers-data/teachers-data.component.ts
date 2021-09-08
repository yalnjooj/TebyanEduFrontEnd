import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
import icModule from '@iconify/icons-ic/view-module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { Subscription } from 'rxjs';

  @Component({
    selector: 'vex-teachers-data',
    templateUrl: './teachers-data.component.html',
    styleUrls: ['../../tebyan-level1.component.scss']
  })
  export class TeachersDataComponent implements OnInit {

    @Input('courseNo') courseNo: string;
  
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
  levelNumber: any;

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

  displayedColumns: string[] = ['id', 'courseNo', 'level', 'catagory', 'beneficiaryType', 'courcesDates', 'startTime', 'typePlace', 'tajwid', 'YearsOfExperience', 'IdentificationNo', 'phoneNo', 'email', 'edit', 'updatedAt', 'createdAt'];
  dataSource: any
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





  ngOnInit(): void {
    

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
          data: {courseNo: this.courseNo}
        }).afterClosed().subscribe(result => {
         
        // this.router.navigate([this.router.url]); 
        // window.location.reload()

        })
  }

  deleteCourse(courseNo){}

}




/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/

import { loadCldr, L10n, setCulture} from '@syncfusion/ej2-base';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { SortPipe } from "src/@vex/pipes/sort.pipe";


@Component({
  selector: 'vex-addNewStudent',
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

    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">

      <mat-form-field fxFlex="auto">
        <mat-label>رقم الهوية</mat-label>
        <input type="text" matInput formControlName="id" required>
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
        <input type="number" matInput formControlName="phone" required>
        <mat-error *ngIf="form.get('phone').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>البريد الإلكتروني</mat-label>
        <input type="email" matInput formControlName="email" required>
        <mat-error *ngIf="form.get('email').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <ejs-datepicker #birthDay id='birthDay' formControlName="birthDay" floatLabelType='Auto' fxFlex="auto" placeholder="تاريخ الميلاد" enableRtl='true' locale='ar'></ejs-datepicker>

      <mat-form-field fxFlex="auto">
        <mat-label>الجنسية</mat-label>
        <mat-select formControlName="nationality">
          <mat-option dir="rtl" required *ngFor="let data of nationalities | sort:'asc':'nationality'" [value]="data.id">{{data.nationality}}</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('nationality').errors?.required">حقل مطلوب</mat-error>
      </mat-form-field>

      <mat-form-field fxFlex="auto">
        <mat-label>بلد الإقامة</mat-label>
        <mat-select formControlName="residence">
          <mat-option dir="rtl" required *ngFor="let data of countries | sort:'asc':'countrylityNameAr'" (click)="residenceCountryId(data.id)" [value]="data.id">{{data.countrylityNameAr}}</mat-option>
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
        <input type="number" max="30" matInput formControlName="memorizing" required>
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
      <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>حفظ</button>
      <button mat-raised-button (click)="form.reset(); show = false">مسح</button>
    </mat-dialog-actions>
  `,
      styleUrls: ['../../tebyan-level1.component.scss']
})
export class AddNewStudent implements OnInit {

  formObject: FormValidator;


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

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(
  private sortPipe: SortPipe,
  public dialog: MatDialog,
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) {

    this.form = this.fb.group({      
      id:  new FormControl(null, [Validators.required]),
      nameAr:  new FormControl(null, [Validators.required]),
      nameEn:  new FormControl(null, [Validators.required]),
      catagory:  new FormControl(null, [Validators.required]),
      nationality:  new FormControl(null, [Validators.required]),
      birthDay:  new FormControl(null, [Validators.required]),
      qualification:  new FormControl(null, [Validators.required]),
      sex:  new FormControl(null, [Validators.required]),
      phone:  new FormControl(null, [Validators.required]),
      email:  new FormControl(null, [Validators.required]),
      residence:  new FormControl(null, [Validators.required]),
      specialization:  new FormControl(null, [Validators.required]),
      memorizing:  new FormControl(null, [Validators.required]),
      tajwed:  new FormControl(null, [Validators.required]),
      expertise:  new FormControl(null, [Validators.required]),
      region:  new FormControl(null, [Validators.required]),
      city:  new FormControl(null, [Validators.required]),
      neighborhood:  new FormControl(null, [Validators.required]),
    });

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


  this.apollo.watchQuery({
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
  this.catagory = data.mexCourseTables.catagory
  
  this.countries = data.mexCourseTables.countries

  
  })



}


nationalitiesFunc(id){

  switch (parseInt(id)) {

    case 1:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityMaleAr})
      });
      break;
  
    case 2:
      this.nationalities = [];
      this.countries.forEach(element => {
        this.nationalities.push({id: element.id, nationality: element.nationalityFemaleAr})
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

  } else {
    this.show = true;
    this.provincesFunc();
    this.form.get('region').setValidators(Validators.required)
    this.form.get('city').setValidators(Validators.required)
    this.form.get('neighborhood').setValidators(Validators.required)
    this.cities = [];
    this.neighborhoods = [];
    
  };

}

public onFocusOut(): void {
  this.formObject.validate("birthDay")
}

provincesFunc(){

  this.apollo.watchQuery({
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

  this.apollo.watchQuery({
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

neighborhoodFunc(id){

  this.apollo.watchQuery({
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

savaData(){

  if(this.form.invalid) return;

  console.log( this.form.get('id').value)
  console.log( parseInt(this.data.courseNo))
    console.log( this.form.get('nameAr').value)
    console.log(  this.form.get('nameEn').value)
    console.log( parseInt(this.form.get('sex').value))
    console.log(  parseInt(this.form.get('catagory').value))
    console.log(  this.form.get('phone').value)
    console.log( this.form.get('email').value)
    console.log( this.form.get('birthDay').value)
    console.log( parseInt(this.form.get('nationality').value))
    console.log( parseInt(this.form.get('residence').value))
    console.log( parseInt(this.form.get('region').value))
    console.log( parseInt(this.form.get('city').value))
    console.log( parseInt(this.form.get('neighborhood').value))
    console.log( parseInt(this.form.get('qualification').value))
    console.log( this.form.get('specialization').value)
    console.log(  parseInt(this.form.get('memorizing').value))
    console.log( JSON.parse(this.form.get('tajwed').value))
    console.log(  parseInt(this.form.get('expertise').value))



  this.ngxSpinnerService.show()
    

  this.apollo.mutate({
    mutation: gql`
      mutation createP01_personal($identification: ID! $nameAr: String $nameEn: String $sex: Int $catagoryId: Int $phone: String $email: String $birthDay: Date $nationalityId: Int $residenceId: Int $regionId: Int $cityId: Int $neighborhoodId: Int $qualificationId: Int $specialization: String $memorizing: Int $tajwed: Boolean $expertise: Int){
        createP01_personal(identification: $identification nameAr: $nameAr nameEn: $nameEn sex: $sex catagoryId: $catagoryId phone: $phone email: $email birthDay: $birthDay nationalityId: $nationalityId residenceId: $residenceId regionId: $regionId cityId: $cityId neighborhoodId: $neighborhoodId qualificationId: $qualificationId specialization: $specialization memorizing: $memorizing tajwed: $tajwed expertise: $expertise)
      }
      `,
      variables:{
        identification: this.form.get('id').value,
        courseId: parseInt(this.data.courseNo),
        nameAr: this.form.get('nameAr').value,
        nameEn:  this.form.get('nameEn').value,
        sex: parseInt(this.form.get('sex').value),
        catagoryId: parseInt(this.form.get('catagory').value),
        phone: this.form.get('phone').value.toString(),
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

   // this.dialogRef.close(true);
  this.ngxSpinnerService.hide()

  this.snackBar.open('تمت الإضافة بنجاح','إغلاق', {
    duration: 6000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });

})

  this.ngxSpinnerService.hide()



}



}
