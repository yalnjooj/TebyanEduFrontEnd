import { Apollo } from 'apollo-angular';
import { Mutations } from './../../graphql/mutations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apollo: Apollo, private router: Router, private ngxSpinnerService: NgxSpinnerService, private _snackBar: MatSnackBar) { }
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  mutation = new Mutations(this.apollo)

  ngOnInit(): void {
    // Online window.navigator.onLine
  }



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })


  getErrorMessageMail() {
    return this.loginForm.get('email').hasError('email') ? 'صيغة البريد الإلكتروني غير صحيحة!' :
      this.loginForm.get('email').hasError('required') ? 'حقل مطلوب!' :
        '';
  }

  getErrorMessagePass() {
    return this.loginForm.get('password').hasError('minlength') ? 'تتألف من 7 أحرف على الأقل' :
      this.loginForm.get('password').hasError('required') ? 'حقل مطلوب!' :
        '';
  }



  logIn() {
          this.ngxSpinnerService.show();




    if (this.loginForm.invalid) {
      console.log(this.loginForm.invalid)
      return
    }

    else {

    //  if(window.navigator.onLine){
        this.mutation.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
          (data) => {
            if (!data.errors) {
            this.router.navigate(['/dashboard'], { state: { data: data?.data['login']?.email } });
  
            } else {
              this._snackBar.open(data.errors[0].message , 'إغلاق', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
            this.ngxSpinnerService.hide();
          },
          (err) => {
            this.ngxSpinnerService.hide();
  
            this._snackBar.open(err, 'إغلاق', {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
          () => console.log('Observer got a complete notification')
  
        )
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











}
