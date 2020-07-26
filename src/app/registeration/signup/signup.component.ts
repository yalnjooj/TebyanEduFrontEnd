import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../tools/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formBuilder: FormBuilder, private authS: AuthService, private router: Router, private ngxSpinnerService: NgxSpinnerService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {

  }

  loginForm: FormGroup = this.formBuilder.group({
    email: (['', [Validators.required, Validators.email]]),
    password1: (['', [Validators.required, Validators.minLength(7)]]),
    password2: (['', [Validators.required, Validators.minLength(7)]]),
    select: (['', Validators.required])
  }, {
    validator: MustMatch.val('password1', 'password2')
  })


  getErrorMessageMail() {
    return this.loginForm.get('email').hasError('email') ? 'صيغة البريد الإلكتروني غير صحيحة!' :
      this.loginForm.get('email').hasError('required') ? 'حقل مطلوب!' :
        '';
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





  signUp() {
    if (this.loginForm.invalid) {
      this._snackBar.open('خطأ في البيانات المدخلة', 'إغلاق', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return
    }

    this.ngxSpinnerService.show();

    this.authS.signUp(this.loginForm.get('email').value, this.loginForm.get('password1').value, this.loginForm.get('select').value).subscribe((data) => {

      if (data['status'] == 400) {
 
        this._snackBar.open(data['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngxSpinnerService.hide();
        return;
      }

      if (data['status'] == 200) {

        this._snackBar.open(data['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngxSpinnerService.hide();
        this.router.navigate(['/login']);

      }



    })


  }







}
