import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icEye from '@iconify/icons-ic/remove-red-eye';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import icSmartDocument from '@iconify/icons-ic/golf-course';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDataFormDialog } from '../../../apps/social/social-profile/social-profile.component';
import { ConformDialogComponent } from 'src/app/custom-layout/member/layout/dialogs/conformDialog/conform.dialog.component'
import { CertificateFormComponent } from 'src/app/custom-layout/member/layout/dialogs/certificateModule/certificate.form.component'

export interface PeriodicElement {
  id: number;
  rowID: number;
  certificatecatagory: string;
  certificateName: string;
  langSex: number;
  cerPosition: string;
  textsPosition: string;
  updatedAt: string;
  createdAt: string;

  langSexType: string;
  cerPositionType: string;
  textsPositionType: string;

  certificatecatagoryID: number;
  langSexID: number;
  cerPositionID: number;
  textsPositionID: number;
}
@Component({
  selector: 'vex-blank',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  userID: number;
  displayedColumns: string[] = ['id', 'certificateName', 'certificatecatagory', 'langSex', 'cerPosition', 'textsPosition','edit2', 'edit', 'updatedAt', 'createdAt'];
  dataSource: any
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icEye = icEye;
  icSettings = icSettings
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
              private apollo: Apollo,
              private ngxSpinnerService: NgxSpinnerService,
              private snackBar: MatSnackBar) { }



  ngOnInit() {
    this.ngxSpinnerService.show()

    this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              id
            }
          }
        `
    }).valueChanges.subscribe(( {data}: any ) => {
      this.userID = data.currentUser.id

      this.apollo.watchQuery({
        query: gql`
            query certificate($uID: ID!){
            certificate(uID: $uID){
              id
              certificatename
              certificatecatagory{
                id
                name
              }
              langSex{
                id
                name
                type
              }
              cerPosition{
                id
                name
                type
              }
              textsPosition{
                id
                name
                type
              }
              updatedAt
              createdAt
            }
          }
          `,
          variables: {
            uID: data.currentUser.id
          }
      }).valueChanges.subscribe(( {data}: any ) => {

        let e: PeriodicElement[] = [];

          data.certificate.forEach((element, index) => {
            e.push({
                id: index + 1,
                rowID: element.id,

                certificatecatagory: element.certificatecatagory.name,
                certificateName: element.certificatename,
                langSex: element.langSex.name,
                cerPosition: element.cerPosition.name,
                textsPosition: element.textsPosition.name,

                langSexType: element.langSex.type,
                cerPositionType: element.cerPosition.type,
                textsPositionType: element.textsPosition.type,

                updatedAt: element.updatedAt,
                createdAt: element.createdAt,

                certificatecatagoryID: element.certificatecatagory.id,
                langSexID: element.langSex.id,
                cerPositionID: element.cerPosition.id,
                textsPositionID: element.textsPosition.id
              })
            });

          this.dataSource = new MatTableDataSource(e);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        })

     this.ngxSpinnerService.hide()
   
    })
       

      

  }




  edit(id, type){

    switch (type) {

      case 'edit':

        this.dialog.open(DialogAddCertificate,{
          disableClose: false,
          data: {cettificateIDs: id, type: 'edit', userID: this.userID}
        }).afterClosed().subscribe(result => {
          if(JSON.parse(result)) this.ngOnInit()
        }); 
      break;

      case 'view':
        console.log(id)

        break;

      case 'delete':
        
        this.dialog.open(ConformDialogComponent,{
          disableClose: false,
          width: '300px',
          data: {hint: 'حذف', message: 'هل تريد حذف النموذج؟'}
        }).afterClosed().subscribe(result => {

          if(!JSON.parse(result)) return

              this.ngxSpinnerService.show()

              this.apollo.mutate({
                mutation: gql`
                  mutation deleteCertificate($id: ID!){
                    deleteCertificate(id: $id)
                  }
                  `,
                  variables:{
                    id: parseInt(id)
                  }
              }).subscribe(( {data}: any ) => {
                this.ngOnInit()
              this.ngxSpinnerService.hide()
                
              this.snackBar.open(data.deleteCertificate,'إغلاق', {
                duration: 6000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
          
            })
        }); 


       break;
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(){
    this.dialog.open(DialogAddCertificate,{
      disableClose: true,
      data: {userID: this.userID, type: 'add'}
    }).afterClosed().subscribe(result => {
      if(JSON.parse(result)) this.ngOnInit()
    }); 
  }


  formSettings(data) {
    this.dialog.open(CertificateFormComponent,{
      disableClose: true,
      width: '100vw',
      maxWidth: '100vw',
      data: {data, userID: this.userID}
    }).afterClosed().subscribe(result => {

      if(JSON.parse(result)){
        this.snackBar.open('تم الحفظ','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

      }
    });  
  }
  
}

@Component({
  selector: 'dialog-add-certificate',
  template: `
  <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
  <p>إنشاء نموذج جديد</p>

  <button type="button" mat-icon-button mat-dialog-close tabindex="-1">
     <mat-icon [icIcon]="icClose"></mat-icon>
   </button>
 </div>
   
<mat-dialog-content [formGroup]="form" class="mat-typography" novalidate>
  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
    <mat-form-field fxFlex="auto">
      <mat-label>إسم المستند</mat-label>
        <md-input-container>
          <input type="text" formControlName="certificateName" matInput required>
        </md-input-container>
      <mat-icon matSuffix [icIcon]="icSmartDocument"></mat-icon>
    </mat-form-field>
  </div>
  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
    <mat-form-field fxFlex="auto">
      <mat-label>التصنيف</mat-label>
      <mat-select formControlName="category">
        <mat-option dir="rtl" required *ngFor="let data of category" value="{{data.id}}">{{data.name}}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field fxFlex="auto">
    <mat-label>النوع</mat-label>
    <mat-select formControlName="langSex">
      <mat-option dir="rtl" required *ngFor="let data of langSex" value="{{data.id}}">{{data.name}}</mat-option>
    </mat-select>
  </mat-form-field>
  </div>
  <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="16px" fxLayoutGap.lt-sm="0">
  <mat-form-field fxFlex="auto">
    <mat-label>وضعية المستند</mat-label>
    <mat-select formControlName="cerPosition">
      <mat-option dir="rtl" required *ngFor="let data of cerPosition" value="{{data.id}}">{{data.name}}</mat-option>
    </mat-select>
  </mat-form-field>
  <mat-form-field fxFlex="auto">
  <mat-label>مربع النص</mat-label>
  <mat-select formControlName="textsPosition">
    <mat-option dir="rtl" required *ngFor="let data of textsPosition" value="{{data.id}}">{{data.name}}</mat-option>
  </mat-select>
</mat-form-field>
</div>
</mat-dialog-content>

<mat-dialog-actions align="start">
  <button mat-raised-button color="warn" mat-dialog-close="false">إلغاء</button>
  <button mat-raised-button color="primary" (click)="savaData()" cdkFocusInitial>حفظ</button>
</mat-dialog-actions>

  `
})
export class DialogAddCertificate implements OnInit {
  icClose = icClose
  icSmartDocument = icSmartDocument;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  form = this.fb.group({
    certificateName:  new FormControl(null, [Validators.required]),
    category:  new FormControl(null, [Validators.required]),
    langSex: new FormControl( null, [Validators.required]),
    cerPosition:  new FormControl(null, [Validators.required]),
    textsPosition:  new FormControl(null, [Validators.required]),
  });
  category: any;
  langSex: any;
  cerPosition: any;
  textsPosition: any;



constructor(
  private fb: FormBuilder,
  private apollo: Apollo,
  private snackBar: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ngxSpinnerService: NgxSpinnerService,
  public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }

 async ngOnInit(){

  this.apollo.watchQuery({
    query: gql`
      query($uID: ID!){
        mexTables(uID: $uID){
          certificatecatagories{
            id
            name
          }
          langSex{
            id
            name
          }
          cerPosition{
            id
            name
          }
          textsPosition{
            id
            name
          }
        }
      }
      `,
      variables:{
        uID: this.data.userID
      }
  }).valueChanges.subscribe(( {data}: any ) => {
    this.category = data.mexTables.certificatecatagories
    this.langSex = data.mexTables.langSex
    this.cerPosition = data.mexTables.cerPosition
    this.textsPosition = data.mexTables.textsPosition

    if(this.data.cettificateIDs){
      this.form = this.fb.group({
      certificateName:  new FormControl(this.data.cettificateIDs.certificateName, [Validators.required]),
      category:  new FormControl(this.data.cettificateIDs.certificatecatagory, [Validators.required]),
      langSex: new FormControl( this.data.cettificateIDs.langSex, [Validators.required]),
      cerPosition:  new FormControl(this.data.cettificateIDs.cerPosition, [Validators.required]),
      textsPosition:  new FormControl(this.data.cettificateIDs.textsPosition, [Validators.required]),
    });

    }

    this.ngxSpinnerService.hide()

})




  }

  savaData(){

    if(this.form.invalid) return

    this.ngxSpinnerService.show()

    switch (this.data.type) {
      case 'add':
        
        this.apollo.mutate({
          mutation: gql`
            mutation createCertificate($uID: Int! $certificatename: String $lang_sex_ID: Int $certificatecatagory_ID: Int $cer_position_ID: Int $texts_position_ID: Int){
              createCertificate(uID: $uID certificatename: $certificatename lang_sex_ID: $lang_sex_ID certificatecatagory_ID: $certificatecatagory_ID cer_position_ID: $cer_position_ID texts_position_ID: $texts_position_ID){
                  id    
              }
            }
            `,
            variables:{
              uID: parseInt(this.data.userID),
              certificatename: this.form.get('certificateName').value.trim(),
              lang_sex_ID: parseInt(this.form.get('langSex').value),
              certificatecatagory_ID: parseInt(this.form.get('category').value),
              cer_position_ID: parseInt(this.form.get('cerPosition').value),
              texts_position_ID: parseInt(this.form.get('textsPosition').value)
            }
        }).subscribe(( {data}: any ) => {
    
        this.dialogRef.close(true);
        this.ngxSpinnerService.hide()
    
        this.snackBar.open('تم إضافة نموذج جديد بنجاح','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    
      })


        break;
    
      case 'edit':

        this.apollo.mutate({
          mutation: gql`
            mutation updateCertificate($id: ID! $certificatename: String $lang_sex_ID: Int $certificatecatagory_ID: Int $cer_position_ID: Int $texts_position_ID: Int){
              updateCertificate(id: $id certificatename: $certificatename lang_sex_ID: $lang_sex_ID certificatecatagory_ID: $certificatecatagory_ID cer_position_ID: $cer_position_ID texts_position_ID: $texts_position_ID)
            }
            `,
            variables:{
              id: parseInt(this.data.cettificateIDs.rowID),
              certificatename: this.form.get('certificateName').value.trim(),
              lang_sex_ID: parseInt(this.form.get('langSex').value),
              certificatecatagory_ID: parseInt(this.form.get('category').value),
              cer_position_ID: parseInt(this.form.get('cerPosition').value),
              texts_position_ID: parseInt(this.form.get('textsPosition').value)
            }
        }).subscribe(( {data}: any ) => {
    
        this.dialogRef.close(true);
        this.ngxSpinnerService.hide()
    
        this.snackBar.open('تم تحديث البيانات بنجاح','إغلاق', {
          duration: 6000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    
      })
      
        break;
    }




  }
}

