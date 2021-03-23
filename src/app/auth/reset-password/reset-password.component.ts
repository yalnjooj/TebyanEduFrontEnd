import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MustMatch } from 'src/app/tools/must-match.validator';
import { TranslateConfigService } from 'src/@vex/services/translate-config.service';

@Component({
  selector: 'vex-register',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  subscribe
  siteLink = location.href.split(`${location.origin}/reset-password/`)[1]

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private apollo: Apollo,
              private ngxSpinnerService: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private translateConfigService: TranslateConfigService,

  ) { }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

  ngOnInit() {

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

        this.snackBar.open('انتهت صلاحية الرابط !!', 'إغلاق', {
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

    this.form = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    },{
      validator: MustMatch.val('password', 'passwordConfirm')
    });
  }

  send() {
    
    if (this.form.invalid){
      this.snackBar.open('خطأ في البيانات المدخلة', 'إغلاق', {
        duration: 6000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {

      this.subscribe.unsubscribe()

      this.ngxSpinnerService.show();
  
     this.subscribe = this.apollo.watchQuery({
        query: gql`
          query resetPassword($tokenID: String! $password: String){
            resetPassword(tokenID: $tokenID password: $password)
        } 
        `,
        variables: { tokenID: this.siteLink, password: this.form.get('password').value }
      }).valueChanges.subscribe((data: any) => {

        if (data.data['resetPassword'] == 'false') {

          this.snackBar.open('انتهت صلاحية الرابط !!', 'إغلاق', {
            duration: 7000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/home'])
  
        } else if (data.data['resetPassword'] == 'go') {
          
          this.snackBar.open('تمت اعادة تعيين كلمة المرور بنجاح !!', 'إغلاق', {
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
