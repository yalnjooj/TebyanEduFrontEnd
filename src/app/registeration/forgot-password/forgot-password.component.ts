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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  loginForm: FormGroup = this.formBuilder.group({
    email: (['', [Validators.required, Validators.email]])
  })

  constructor(private apollo: Apollo, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private authS: AuthService, private router: Router, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }


  forgotPassword() {
    if (this.loginForm.get('email').invalid) return;

    this.ngxSpinnerService.show();

    this.apollo.watchQuery({
      query: gql`
        query forgotPassword($email: String!){
          forgotPassword(email: $email)
          }
      `,
      variables: {
        email: this.loginForm.get('email').value
      }
    }).valueChanges.subscribe(data => {

      if (data.data['forgotPassword']) {
      this.router.navigate(['/home']);

      this._snackBar.open(data.data['forgotPassword'], 'إغلاق', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
          
        });

      } else {

        this._snackBar.open('لا يوجد مستخدم مسجل بهذا العنوان', 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      this.ngxSpinnerService.hide();
    },
      err => {

        this._snackBar.open(err, 'إغلاق', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngxSpinnerService.hide();
      })

    }


  getErrorMessageMail() {
    return this.loginForm.get('email').hasError('email') ? 'صيغة البريد الإلكتروني غير صحيحة!' :
      this.loginForm.get('email').hasError('required') ? 'حقل مطلوب!' :
        '';
  }


}
