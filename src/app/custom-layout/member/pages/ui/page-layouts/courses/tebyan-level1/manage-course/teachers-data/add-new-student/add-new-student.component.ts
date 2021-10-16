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
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { loadCldr, L10n, setCulture} from '@syncfusion/ej2-base';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SortPipe } from "src/@vex/pipes/sort.pipe";
import { ConformDialogComponent } from 'src/app/custom-layout/member/layout/dialogs/conformDialog/conform.dialog.component';
import { ChangeDataFormDialog } from 'src/app/custom-layout/member/pages/apps/social/social-profile/social-profile.component';


@Component({
  selector: 'vex-addNewStudent',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit, AfterContentInit, OnDestroy {

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
savaButton = true;

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
dataLink: any
@Input() set dataLinkFn(dataLink: any){ this.dataLink = dataLink }

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
  private unsubscription5: Subscription;
  private unsubscription6: Subscription;
  private unsubscription7: Subscription;

  ngOnDestroy(): void {
    this.unsubscription0?.unsubscribe()
    this.unsubscription1?.unsubscribe()
    this.unsubscription2?.unsubscribe()
    this.unsubscription3?.unsubscribe()
    this.unsubscription4?.unsubscribe()
    this.unsubscription5?.unsubscribe()
    this.unsubscription6?.unsubscribe()
    this.unsubscription7?.unsubscribe()
  
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


  this.unsubscription2 = this.apollo.watchQuery({
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
  this.countries = data.mexCourseTables.countries

  this.catagory = data.mexCourseTables.catagory.filter((value, index, array)=>{
    return !(parseInt(value.id) == 1 || parseInt(value.id) == 2)
   })

  

  
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
  this.unsubscription0?.unsubscribe()

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
    this.savaButton = true

  } else {


    this.ngxSpinnerService.show()

   this.unsubscription3 = this.apollo.watchQuery({
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
          courseId: parseInt(this.data?.courseNo || this.dataLink?.courseId),
          level: parseInt(this.data?.level || this.dataLink?.level)
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

  this.unsubscription4 = this.apollo.watchQuery({
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
  this.unsubscription5 = this.apollo.watchQuery({
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
  this.unsubscription6 = this.apollo.watchQuery({
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


  this.unsubscription7 = this.apollo.mutate({
    mutation: gql`
      mutation createP01_personal($identification: ID! $status: String! $courseId: Int $nameAr: String $nameEn: String $sex: Int $catagoryId: Int $phone: String $companyPhoneKey: Int $email: String $birthDay: Date $nationalityId: Int $residenceId: Int $regionId: Int $cityId: Int $neighborhoodId: Int $qualificationId: Int $specialization: String $memorizing: Int $tajwed: Boolean $expertise: Int){
        createP01_personal(identification: $identification status: $status courseId: $courseId nameAr: $nameAr nameEn: $nameEn sex: $sex catagoryId: $catagoryId phone: $phone companyPhoneKey: $companyPhoneKey email: $email birthDay: $birthDay nationalityId: $nationalityId residenceId: $residenceId regionId: $regionId cityId: $cityId neighborhoodId: $neighborhoodId qualificationId: $qualificationId specialization: $specialization memorizing: $memorizing tajwed: $tajwed expertise: $expertise)
      }
      `,
      variables:{
        identification: this.form.get('id').value,
        status: this.status.status,
        courseId: parseInt(this.data?.courseNo || this.dataLink?.courseId),
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