import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/tools/must-match.validator';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  subscribe
  hide1 = true;
  hide2 = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  siteLink = location.href.split(`${location.origin}/resetPassword/`)[1]

  loginForm: FormGroup = this.formBuilder.group({
    password1: (['', [Validators.required, Validators.minLength(7)]]),
    password2: (['', [Validators.required, Validators.minLength(7)]]),
  }, {
    validator: MustMatch.val('password1', 'password2')
  })

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private router: Router, private ngxSpinnerService: NgxSpinnerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.ngxSpinnerService.show();

   this.subscribe = this.apollo.watchQuery({
      query: gql`
        query resetPassword($tokenID: String!){
          resetPassword(tokenID: $tokenID)
      } 
      `,
      variables: { tokenID: this.siteLink }
    }).valueChanges.subscribe(data => {


      if (data.data['resetPassword'] == 'false') {
        this._snackBar.open('انتهت صلاحية الرابط !!', 'إغلاق', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/home'])

      } else if (data.data['resetPassword'] == 'مع نفسك') {
        this.router.navigate(['/home'])
      }

      this.ngxSpinnerService.hide();
    },
      err => {
        console.log(err)
      })

  }




  getErrorMessagePass1() {
    return this.loginForm.get('password1').hasError('minlength') ? 'تتألف من 7 أحرف على الأقل' :
      this.loginForm.get('password1').hasError('required') ? 'حقل مطلوب!' :
        '';
  }
  getErrorMessagePass2() {
    return this.loginForm.get('password2').hasError('minlength') ? 'تتألف من 7 أحرف على الأقل' :
      this.loginForm.get('password2').hasError('required') ? 'حقل مطلوب!' :
        this.loginForm.get('password2').hasError('mustMatch') ? 'كلمة المرور غير متطابقة !' :
          '';


  }


  resetPassPost() {
    if (this.loginForm.invalid) return;

    this.subscribe.unsubscribe()

    this.ngxSpinnerService.show();

   this.subscribe = this.apollo.watchQuery({
      query: gql`
        query resetPassword($tokenID: String! $password: String){
          resetPassword(tokenID: $tokenID password: $password)
      } 
      `,
      variables: { tokenID: this.siteLink, password: this.loginForm.get('password2').value }
    }).valueChanges.subscribe(data => {

      if (data.data['resetPassword'] == 'false') {
        console.log(data.data['resetPassword'] == 'false')
        console.log(data.data['resetPassword'])
        this._snackBar.open('انتهت صلاحية الرابط !!', 'إغلاق', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/home'])

      } else if (data.data['resetPassword'] == 'go') {
        console.log(data.data['resetPassword'] == 'go')
        console.log(data.data['resetPassword'])

        this._snackBar.open('تم اعادة تعيين كلمة المرور بنجاح !!', 'إغلاق', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.router.navigate(['/login'])
      }



      this.ngxSpinnerService.hide();
    },
      err => {
        console.log(err)
      })
    
      this.ngxSpinnerService.hide();
  }

  onDestroy(){
    this.subscribe.unsubscribe()
  }


}



