import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/tools/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private authS: AuthService, private router: Router, private ngxSpinnerService: NgxSpinnerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetPassGet(this.siteLink)
  }

  resetPassGet(link) {
    this.ngxSpinnerService.show();

    this.authS.resetPassGet(link).subscribe((data) => {
      if (data['status'] == 400) {
        this.ngxSpinnerService.hide();

        this._snackBar.open(data['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.router.navigate(['/login'])
      }

      if (data['status'] == 200) {
        this.ngxSpinnerService.hide();

        this._snackBar.open(data['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
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

    this.ngxSpinnerService.show();

    this.authS.resetPassPost(this.loginForm.get('password2').value, this.siteLink).subscribe((data) => {

      if (data['status'] == 400) {
        this.ngxSpinnerService.hide();
        this._snackBar.open(data['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.router.navigate(['/']); return
      }

      if (data.status == 200) {
        this.ngxSpinnerService.hide();
        this._snackBar.open(data.body['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.router.navigate(['/login']);
      }

    })
  }

  
}



