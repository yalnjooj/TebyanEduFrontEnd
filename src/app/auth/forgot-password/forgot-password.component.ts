import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import {patternsEmail} from 'src/app/tools/patterns';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apollo, gql } from 'apollo-angular';
import { TranslateConfigService } from 'src/@vex/services/translate-config.service';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;


  icMail = icMail;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private ngxSpinnerService: NgxSpinnerService,
    private translateConfigService: TranslateConfigService


  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnDestroy(){
    this.form.get('email').reset()
  }

  send() {
    
    if (this.form.get('email').invalid){
      this.snackBar.open('البيانات غير صحيحة!!', 'إغلاق', {
        duration: 7000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
        
      });
    } else {
      this.ngxSpinnerService.show();

      this.apollo.watchQuery({
        query: gql`
          query forgotPassword($email: String!){
            forgotPassword(email: $email)
            }
        `,
        variables: {
          email: this.form.get('email').value
        }
      }).valueChanges.subscribe(data => {
  
        if (data.data['forgotPassword']) {
        this.router.navigate(['/login']);
  
        this.snackBar.open(data.data['forgotPassword'], 'إغلاق', {
            duration: 7000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
            
          });
  
        } else {
  
          this.snackBar.open('لا يوجد مستخدم مسجل بهذا العنوان', 'إغلاق', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.ngxSpinnerService.hide();
      },
        err => {
  
          this.snackBar.open(err, 'إغلاق', {
            duration: 7000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngxSpinnerService.hide();
        })
    }



  }
}
