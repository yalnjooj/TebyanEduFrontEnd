import { Component, Inject, OnInit } from '@angular/core';
import { FriendSuggestion } from '../social.component';
import { friendSuggestions } from 'src/static-data/friend-suggestions';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icLuck from '@iconify/icons-ic/twotone-security';
import icNotes from '@iconify/icons-ic/twotone-notes';
import icAvatar from '@iconify/icons-ic/twotone-image';
import {patternsEmail, patternsNumber} from 'src/app/tools/patterns';
import { MustMatch } from 'src/app/tools/must-match.validator';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icSmartemail from '@iconify/icons-ic/twotone-email';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import icSmartVisibility from '@iconify/icons-ic/twotone-visibility';
import icSmartVisibilityOFF from '@iconify/icons-ic/twotone-visibility-off';

@Component({
  selector: 'vex-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialProfileComponent implements OnInit {

  suggestions = friendSuggestions;

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icLuck = icLuck;
  icNotes = icNotes;
  icAvatar = icAvatar;

  id: number
  companyName: string
  email: string
  companyType: string
  tell: number
  PHONECODE: number
  avatar: string
  countryId: number
  companyTypeId: number
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  
  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              id
              companyName
              email
              companyType{
                companyType
              }
              country{
                PHONECODE
              }
              tell
              companyTypeId
              countryId
            }
        }
        `
}).valueChanges.subscribe( ( {data}: any ) => {

      this.id = data.currentUser.id
      this.companyName = data.currentUser.companyName
      this.email = data.currentUser.email
      this.companyType = data.currentUser.companyType.companyType
      this.companyTypeId = data.currentUser.companyTypeId
      this.tell = data.currentUser.tell 
      this.PHONECODE = data.currentUser.country.PHONECODE
      this.countryId = data.currentUser.countryId

    })
  }

  openDialogueWindow(id, type, $event){

    switch (type) {
      case 'companyName':
        this.add(id, ' إسم المنظمة الجديد', type,  this.companyName)
      break;

      case 'companyType':
        this.add(id, 'تغيير نوع المنظمة الجديد', type, this.companyTypeId)
      break;

      case 'PHONECODE':
        this.add(id, ' رقم الجوال الجديد', type, {tell: this.tell, countryId: this.countryId})
      break;

      case 'email':
        this.add(id, ' عنوان البريد الإلكتروني الجديد', type, this.email)
      break;
      
      case 'password':
        this.add(id, ' كلمة المرور الجديدة', type, null)
      break;

      case 'avatar':
        const file = $event.target.files[0]

        if(!file) return
        
        const imgType = file.type.split('/')[1]

        if(!(imgType == 'jpeg') &&
           !(imgType == 'png') &&
           !(imgType == 'gif')) {

            this.snackBar.open('صيغة الملف غير صحيحة','إغلاق', {
              duration: 6000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });

            return
           }

          const imgSize = parseFloat(((file.size / (1024*1024)).toFixed(2)))

          if((imgSize > 2)){

            this.snackBar.open('حجم الملف كبير','إغلاق', {
              duration: 6000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });

            return
          }

          this.apollo.mutate({
            mutation: gql`
              mutation updateUser( $id: ID! $avatar: Upload){
                updateUser( id: $id, avatar: $avatar){
                  id
                  avatar
                  }
                }
            `,
            variables: {
              id,
              avatar: file
            },
            context: {
              useMultipart: true
            }
          }).subscribe( ( {data}: any ) => {
            if(data.updateUser.avatar) window.location.reload();
          })

      
    break;
    }

  }

add(id, message, type, inputValue){
  const dialogRef = this.dialog.open(ChangeDataFormDialog, {
    width: '350px',
    disableClose: true,
    data: {id, message, type, inputValue}
  });

  dialogRef.afterClosed().subscribe(result => {
    
    if(!result) return

    switch (result.type) {

        case 'companyName':
          this.companyName = result.value
          break;
      
        case 'companyType':
          this.companyType = result.value
          break;

        case 'PHONECODE':
          this.PHONECODE = result.value.PHONECODE
          this.tell = result.value.tell
          break;

        case 'email':
          this.email = result.value
          break;

      }
  });

}

  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }
}




@Component({
  selector: 'dialog-change-data-form',
  template: `
  <h1 mat-dialog-title>تعديل</h1>

  <div [formGroup]="form" [ngSwitch]="data.type">

    <div *ngSwitchCase="'companyName'">

      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>{{data.message}}</mat-label>
          <input matInput type="text" required formControlName="companyName">
        </mat-form-field>
      </div>
      
    </div>
    <div *ngSwitchCase="'companyType'">

      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>اختر</mat-label>
          <mat-select formControlName="companyType">
            <mat-option dir="rtl" required *ngFor="let companyType of companiesTypes" value="{{companyType.id}}">{{companyType.companyType}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

    </div>
    <div *ngSwitchCase="'PHONECODE'">
      <mat-form-field dir="ltr" fxFlex="190px">
        <mat-label>رقم الجوال الجديد</mat-label>
          <md-input-container>
            <input maxlength="15" placeholder="555-555-1234" formControlName="tell" matInput required>
          </md-input-container>
        <mat-icon matSuffix [icIcon]="icSmartphone"></mat-icon>
      </mat-form-field>
      <mat-form-field fxFlex="90px">
      <mat-label>اختر مفتاح الدولة</mat-label>
        <mat-select formControlName="companyKey" required>
          <mat-option dir="rtl" *ngFor="let infoo of fackInfo" value="{{infoo.id}}">
            <img style="display: inline;" width="30px" src="http://localhost:3000/uploadedFiles/flags/48x48/{{infoo.ISO2Code}}.png" />
            {{infoo.PHONECODE}}+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{infoo.countrylityNameAr}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div *ngSwitchCase="'email'">
      <mat-form-field fxFlex="220px">
        <mat-label>أدخل البريد الإلكتروني الجديد</mat-label>
          <md-input-container>
            <input formControlName="email" matInput required>
          </md-input-container>
        <mat-icon [icIcon]="icSmartemail" class="mr-2" matPrefix></mat-icon>
      </mat-form-field>
    </div>
    <div *ngSwitchCase="'password'">
    
      <mat-form-field fxLayout="row">
        <mat-label>أدخل كلمة المرور القديمة</mat-label>
          <md-input-container>
            <input [type]="o_hide ? 'password' : 'text'" formControlName="Opassword" matInput required>
          </md-input-container>
        <mat-icon (click)="o_hide = !o_hide" [icIcon]="o_hide ? icSmartVisibilityOFF : icSmartVisibility" class="mr-2" matPrefix></mat-icon>
      </mat-form-field>

      <mat-form-field fxLayout="row">
        <mat-label>كلمة المرور الجديدة</mat-label>
          <md-input-container>
            <input [type]="C_hide ? 'password' : 'text'" formControlName="password" matInput required>
          </md-input-container>
        <mat-icon (click)="C_hide = !C_hide" [icIcon]="C_hide ? icSmartVisibilityOFF : icSmartVisibility" class="mr-2" matPrefix></mat-icon>
      </mat-form-field>

      <mat-form-field fxLayout="row">
        <mat-label>تأكيد كلمة المرور الجديدة</mat-label>
          <md-input-container>
            <input [type]="C_hide ? 'password' : 'text'" formControlName="confirmPassword" matInput required>
          </md-input-container>
        <mat-icon (click)="C_hide = !C_hide" [icIcon]="C_hide ? icSmartVisibilityOFF : icSmartVisibility" class="mr-2" matPrefix></mat-icon>
      </mat-form-field>
    
    </div>
  </div>




<div mat-dialog-actions>
  <button mat-button mat-dialog-close>إلغاء</button>
  <button mat-button  color="primary" [disabled]="form.invalid" (click)="saveData()">حفظ</button>
</div>`
})
export class ChangeDataFormDialog implements OnInit {
  form: FormGroup;
  fackInfo: Array<object>;
  companiesTypes: Array<object>;
  icSmartphone = icSmartphone;
  icSmartemail = icSmartemail;
  C_hide = true;
  o_hide = true;
  icSmartVisibility = icSmartVisibility;
  icSmartVisibilityOFF = icSmartVisibilityOFF;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<ChangeDataFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar) {}

    ngOnInit(): void {

      this.form = this.fb.group({
        companyName:  new FormControl(null, [Validators.required]),
        companyType: new FormControl( null, [Validators.required]),
        tell:  new FormControl(null, [Validators.required, Validators.pattern(patternsNumber)]),
        companyKey:  new FormControl(null, [Validators.required]),
        email:  new FormControl(null, [Validators.email, Validators.required]),
        Opassword: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        confirmPassword:  new FormControl(null, Validators.required)
      },{
        validator: MustMatch.val('password', 'confirmPassword')
      });


      switch (this.data.type) {
        case 'companyName':
          this.form = this.fb.group({
            companyName:  new FormControl(this.data.inputValue)
          });  
          break;
      
        case 'companyType':

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
            this.form = this.fb.group({
              companyType: new FormControl(this.data.inputValue.toString())
            }); 
            this.companiesTypes = data.data.companyType
          })
          break;


        case 'PHONECODE':

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
            this.form = this.fb.group({
              tell:  new FormControl(this.data.inputValue.tell),
              companyKey: new FormControl(this.data.inputValue.countryId.toString()),
            });
            this.fackInfo = data.data.countries
          })
          break;

        case 'email':
          this.form = this.fb.group({
            email: new FormControl(this.data.inputValue, [Validators.email])
          });
          break;

        case 'password':
          this.form = this.fb.group({
            Opassword: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            confirmPassword:  new FormControl(null, Validators.required)
          },{
            validator: MustMatch.val('password', 'confirmPassword')
          });
          break;
      }

    }


  saveData(): void {

    switch (this.data.type) {

      case 'companyName':

        this.apollo.mutate({
          mutation: gql`
            mutation updateUser($id: ID! $companyName: String){
              updateUser(id: $id, companyName: $companyName){
                id
                companyName
                }
              }
          `,
          variables: {
            id: this.data.id,
            companyName: this.form.get('companyName').value
          }
        }).subscribe(({data}: any) => {
          if(data.errors) return

          this.dialogRef.close({value: data.updateUser.companyName, type: this.data.type});
          window.location.reload();
        })

        break;
    
      case 'companyType':
        this.apollo.mutate({
          mutation: gql`
            mutation updateUser($id: ID! $companyTypeId: Int){
              updateUser(id: $id, companyTypeId: $companyTypeId){
                companyType{
                    id
                    companyType
                  }
                }
              }
          `,
          variables: {
            id: this.data.id,
            companyTypeId: parseInt(this.form.get('companyType').value)
          }
        }).subscribe(({data}: any) => {
          if(data.errors) return

          this.dialogRef.close({value: data.updateUser.companyType.companyType, type: this.data.type});
        })

        break;


      case 'PHONECODE':
        this.apollo.mutate({
          mutation: gql`
            mutation updateUser($id: ID! $tell: Int $countryId: Int){
              updateUser(id: $id, tell: $tell, countryId: $countryId){
                tell
                country{
                  PHONECODE
                  }
                }
              }
          `,
          variables: {
            id: this.data.id,
            tell: parseInt(this.form.get('tell').value),
            countryId: parseInt(this.form.get('companyKey').value)
          }
        }).subscribe(({data}: any) => {
          if(data.errors) return
           this.dialogRef.close({value: {tell: data.updateUser.tell, PHONECODE: data.updateUser.country.PHONECODE}, type: this.data.type});
        })


        break;

      case 'email':
        this.apollo.mutate({
          mutation: gql`
            mutation updateUser($id: ID! $email: String){
              updateUser(id: $id, email: $email){
                email
                }
              }
          `,
          variables: {
            id: this.data.id,
            email: this.form.get('email').value,
          }
        }).subscribe(({data}: any) => {
          if(data.errors) return

          this.dialogRef.close({value: data.updateUser.email, type: this.data.type});
        })

        break;

      case 'password':

        this.apollo.mutate({
          mutation: gql`
            mutation updateUser($id: ID! $password: String $Opassword: String){
              updateUser(id: $id, password: $password, Opassword: $Opassword){
                id
                }
              }
          `,
          variables: {
            id: this.data.id,
            password: this.form.get('password').value,
            Opassword: this.form.get('Opassword').value
          }
        }).subscribe(({data, errors}: any) => {
          if(errors){
            this.snackBar.open(errors[0].message, 'إغلاق', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this.dialogRef.close();
            this.snackBar.open('تم تغيير كلمة المرور بنجاح!', 'إغلاق', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }

        })

        break;
    }
  }

}



