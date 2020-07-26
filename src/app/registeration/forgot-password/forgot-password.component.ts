import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/tools/must-match.validator';

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

  constructor(private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private  authS: AuthService,  private router: Router,  private ngxSpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
  }


  forgotPassword(){
if(this.loginForm.get('email').invalid) return;

 this.ngxSpinnerService.show();
    this.authS.forgotPassword(this.loginForm.get('email').value).subscribe((data)=>{

      if(data.body['status'] == 400){
        this.ngxSpinnerService.hide();
        
        this._snackBar.open(data.body['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

      if(data.body['status'] == 200){
        this.ngxSpinnerService.hide();
        this._snackBar.open(data.body['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

          this.router.navigate(['/'])

      }
    })

  }


  getErrorMessageMail() {
    return this.loginForm.get('email').hasError('email') ? 'صيغة البريد الإلكتروني غير صحيحة!' :
      this.loginForm.get('email').hasError('required') ? 'حقل مطلوب!' :
        '';
  }
  

}
