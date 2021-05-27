import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { Apollo, gql } from 'apollo-angular';
import { Role } from 'src/app/tools/roles'
import { TranslateConfigService } from 'src/@vex/services/translate-config.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  inputType = 'password';
  visible = false;
  
  loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private apollo: Apollo,
              private translateConfigService: TranslateConfigService,
              private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    })
  }

  ngOnDestroy(){
    this.loginForm.get('email').reset()
    this.loginForm.get('password').reset()
  }

 async logIn() {
   this.ngxSpinnerService.show();

if (this.loginForm.invalid) {
  this.ngxSpinnerService.hide();
  return
} else {

//  if(window.navigator.onLine){

  await  this.apollo.mutate({ 
    mutation: gql`
     mutation login($email: String! $password: String!){
      login(email: $email password: $password){
          role{
            id
          }
      }
    }
    `,
    variables: {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
  }).subscribe(({data, errors}: any) => {
     

    if (!errors) {
      
    switch (JSON.parse(data.login.role.id)) {
      
      case Role.ADMIN:
        this.router.navigate(['/admin'], {
          state: { data: Role.ADMIN },
        })
        this.ngxSpinnerService.hide(); 
        break;
    
      case Role.MEMBER:
        this.router.navigate(['/member'], {
          state: { data: Role.MEMBER },
        })
        this.ngxSpinnerService.hide(); 
        break;

      case Role.GUEST:
        this.router.navigate(['/guest'], {
          state: { data: Role.GUEST },
        })
        this.ngxSpinnerService.hide(); 
        break;
    }

      } else {
        this.ngxSpinnerService.hide();

        this.snackbar.open(errors[0].message , 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

      }


  }, (error) =>{
    this.ngxSpinnerService.hide();
    console.log('error', error)
  })

// } else {
//   this.ngxSpinnerService.hide();

//   this._snackBar.open('غير متصل بالانترنت !!', 'إغلاق', {
//     duration: 4000,
//     horizontalPosition: this.horizontalPosition,
//     verticalPosition: this.verticalPosition,
//   });
// }


}

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

  
}
