import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { map, startWith } from 'rxjs/operators';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icPerson from '@iconify/icons-ic/twotone-person';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icSmartemail from '@iconify/icons-ic/twotone-email';
import icSmartVisibility from '@iconify/icons-ic/twotone-visibility';
import icSmartVisibilityOFF from '@iconify/icons-ic/twotone-visibility-off';
import {patternsEmail, patternsNumber} from 'src/app/tools/patterns';
import { MustMatch } from '../../tools/must-match.validator';
import { Apollo, gql } from 'apollo-angular';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateConfigService } from 'src/@vex/services/translate-config.service';



export interface CountryState {
  name: string;
  population: string;
  flag: string;
}



@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  fackInfo: Array<object>;
  companiesTypes: Array<object>;
  vcKey = 'select'
  formc: FormGroup;
  formu: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icArrowDropDown = icArrowDropDown;
  icPerson = icPerson;
  icSmartphone = icSmartphone;
  icSmartemail = icSmartemail;
  icSmartVisibility = icSmartVisibility;
  icSmartVisibilityOFF = icSmartVisibilityOFF;

  C_hide = true;
  U_hide = true;
  maxlength
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private apollo: Apollo,
              private ngxSpinnerService: NgxSpinnerService,
              private translateConfigService: TranslateConfigService

  ) { }
  
  fcKey(val){
    console.log("vcKey", val)
  }

  ngOnDestroy(){
    this.reset1()
  }


  ngOnInit() {

    this.apollo.watchQuery({
      query: gql`
        query{
          companyType{
            id
            companyType
          }
        }
      `
    }).valueChanges.subscribe((data: any) =>{
      this.companiesTypes = data.data.companyType
    })

    this.apollo.watchQuery({
      query: gql`
        query{
          countries{
            id
            countrylityNameEn
            countrylityNameAr
            ISO2Code
            length
            PHONECODE
          }
        }
      `
    }).valueChanges.subscribe((data: any) =>{
      this.fackInfo = data.data.countries
    })
    

    this.formc =  this.fb.group({
      companyType:  new FormControl('', [Validators.required]),
      companyName:  new FormControl('', [Validators.required]),
      Ctell:  new FormControl('', [Validators.required, Validators.pattern(patternsNumber)]),
      CcompanyKey:  new FormControl('', [Validators.required]),
      Cemail:  new FormControl('', [Validators.email, Validators.required, Validators.pattern(patternsEmail)]),
      password:  new FormControl('', Validators.required),
      confirmPassword:  new FormControl('', Validators.required)
    },{
      validator: MustMatch.val('password', 'confirmPassword')
    });

    this.formu =  this.fb.group({
     // country:  new FormControl('', [Validators.required]),
      firstName:  new FormControl('', [Validators.required]),
      sacondName:  new FormControl('', [Validators.required]),
      thirdName:  new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
      Utell:  new FormControl('', [Validators.required, Validators.pattern(patternsNumber)]),
      UcompanyKey:  new FormControl('', [Validators.required]),
      Uemail:  new FormControl('', [Validators.email, Validators.required, Validators.pattern(patternsEmail)]),
      Upassword:  new FormControl('', Validators.required),
      UconfirmPassword:  new FormControl('', Validators.required)
    },{
      validator: MustMatch.val('Upassword', 'UconfirmPassword')
    });
  }

  userInfo(){
    if (this.formu.invalid) {
      console.log('formc',this.formu.invalid)
      this.snackBar.open(this.formc.invalid.toString(), 'إغلاق', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {

    //  console.log(this.formu.get('country').value)
      console.log(this.formu.get('firstName').value)
      console.log(this.formu.get('sacondName').value)
      console.log(this.formu.get('thirdName').value)
      console.log(this.formu.get('lastName').value)
      console.log(this.formu.get('Utell').value)
      console.log(this.formu.get('UcompanyKey').value)
      console.log(this.formu.get('Uemail').value)
      console.log(this.formu.get('Upassword').value)
      console.log(this.formu.get('UconfirmPassword').value)

      this.ngxSpinnerService.show();

      this.apollo.mutate({
        mutation: gql`
          mutation signupUser($firstName: String! $sacondName: String! $thirdName: String! $lastName: String! $Utell: String! $UcompanyKey: String! $Uemail: String! $Upassword: String!){
            signupUser(firstName: $firstName, sacondName: $sacondName, thirdName: $thirdName, lastName: $lastName, Utell: $Utell, UcompanyKey: $Uemail, Uemail: $UcompanyKey, Upassword: $Upassword){
                      email
                      }
            }
        `,
        variables: {
          firstName: this.formu.get('firstName').value,
          sacondName: this.formu.get('sacondName').value,
          thirdName: this.formu.get('thirdName').value,
          lastName: this.formu.get('lastName').value,
          Utell: this.formu.get('Utell').value,
          UcompanyKey: this.formu.get('UcompanyKey').value,
          Uemail: this.formu.get('Uemail').value,
          password: this.formu.get('Upassword').value,
        }
      }).subscribe(data => {
        console.log('data', data)
        this.ngxSpinnerService.hide();
      })

    }
  }


  companyInfo(){

    if (this.formc.invalid) {

      this.snackBar.open('خطأ في البيانات المدخلة', 'إغلاق', {
        duration: 6000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

    } else {
      // console.log(this.formc.get('companyType').value)
      // console.log(this.formc.get('companyName').value)
      // console.log(this.formc.get('Ctell').value)
      // console.log(this.formc.get('CcompanyKey').value)
      // console.log(this.formc.get('Cemail').value)
      // console.log(this.formc.get('password').value)
      // console.log(this.formc.get('confirmPassword').value)
      this.ngxSpinnerService.show();

      this.apollo.mutate({
        mutation: gql`
          mutation signup( $companyName: String $tell: String $companyTypeId: Int $countryId: Int $email: String $password: String){
            signup( companyName: $companyName, tell: $tell, companyTypeId: $companyTypeId, countryId: $countryId, email: $email, password: $password){
              id
              email
              }
            }
        `,
        variables: {
          companyTypeId: parseInt(this.formc.get('companyType').value),
          companyName: this.formc.get('companyName').value,
          tell: this.formc.get('Ctell').value,
          countryId: parseInt(this.formc.get('CcompanyKey').value),
          email: this.formc.get('Cemail').value,
          password: this.formc.get('password').value
        }
      }).subscribe(data => {
        
        if (!data.errors) {
          this.router.navigate(['/login']);
          this.snackBar.open('تم تسجيل بيناتك بنجاح، يمكنك تسجيل الدخول إلى النظام عبر هذي الصفحة!!', 'إغلاق', {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.reset1()

        } else {
          this.snackBar.open(data.errors[0].message, 'إغلاق', {
            duration: 7000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.ngxSpinnerService.hide();
      },
      err => {
        this.snackBar.open(err, 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngxSpinnerService.hide();
      })

    }
  }

  reset1(){
      this.formc.get('companyType').reset()
      this.formc.get('companyName').reset()
      this.formc.get('Ctell').reset()
      this.formc.get('CcompanyKey').reset()
      this.formc.get('Cemail').reset()
      this.formc.get('password').reset()
      this.formc.get('confirmPassword').reset()
  }

  reset2(){
    //  this.formu.get('country').value
    this.formu.get('firstName').reset()
    this.formu.get('sacondName').reset()
    this.formu.get('thirdName').reset()
    this.formu.get('lastName').reset()
    this.formu.get('Utell').reset()
    this.formu.get('UcompanyKey').reset()
    this.formu.get('Uemail').reset()
    this.formu.get('Upassword').reset()
    this.formu.get('UconfirmPassword').reset()
}

  stateCtrl = new FormControl();
  
  states: CountryState[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  filteredStates$ = this.stateCtrl.valueChanges.pipe(
    startWith(''),
    map(state => state ? this.filterStates(state) : this.states.slice())
  );

  send() {
    this.router.navigate(['/']);
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }


  filterStates(name: string) {
    return this.states.filter(state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
