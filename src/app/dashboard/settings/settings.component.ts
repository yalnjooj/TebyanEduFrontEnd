import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { DialogBoxComponent } from '../../tools/dialog-box/dialog-box.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface PeriodicElement {
  No: number;
  courseName: String;
  cr_title_AR: String,
  cr_title_EN: String,
  cr_text_M_AR: String,
  cr_text_M_EN: String,
  cr_text_F_AR: String,
  cr_text_F_EN: String
  cr_Note_M_AR: String,
  cr_Note_M_EN: String,
  cr_Note_F_AR: String,
  cr_Note_F_EN: String
  editDate: String;
  createData: String;
}



// /**
//  * @title Table with sorting
//  */

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['No', 'courseName', 'edit', 'editDate', 'createData'];

  dataSource;
  public courseN : any = {};
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('courseName') courseName;

  fileSelected: File = null;
  certifications;
  marks;
  signatures;
  stamps;
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private authS: AuthService, private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCertifications('c', 'm', 's');
    this.getMarks('c', 'm', 's');
    this.getSignatures('c', 'm', 's');
    this.getStamps()
    this.getCourses()
  }



  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '900px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });

  }

  addRowData(row_obj){

    this.saveCourses(row_obj)

    this.table.renderRows();
    
  }

  updateRowData(row_obj){
  this.editCourses(row_obj.No, row_obj)
  }

  deleteRowData(row_obj){
    this.deleteCourses(row_obj.No)
  }



  onFileSelected(event) {
    this.fileSelected = <File>event.target.files[0];

    let valToLower = this.fileSelected.name.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg|gif|jfif)$"); //add or remove required extensions here
    let regexTest = regex.test(valToLower);

    if(regexTest){
      this._snackBar.open('صيغة الصورة مقبولة', 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      this._snackBar.open('صيغة الصورة غير مقبولة', 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }


  getCertifications(c, m, s) {
    if (c && m && s) {
      this.authS.getCertifications().subscribe(data => {
        this.certifications = data.body['items'];
      })
    } else if (c) {
      this.authS.getCertifications().subscribe(data => {
        this.certifications = data.body['items'];
      })
    }

  }

  getMarks(c, m, s) {
    if (c && m && s) {
      this.authS.getMarks().subscribe(data => {
        this.marks = data.body['items'];
      })
    } else if (m) {
      this.authS.getMarks().subscribe(data => {
        this.marks = data.body['items'];
      })
    }
  }

  getSignatures(c, m, s) {
    if (c && m && s) {
      this.authS.getSignatures().subscribe(data => {
        this.signatures = data.body['items'];
      })
    } else if (s) {
      this.authS.getSignatures().subscribe(data => {
        this.signatures = data.body['items'];
      })
    }
  }

  getStamps() {
    this.authS.getStamps().subscribe(data => {
      this.stamps = data.body['items'];
    })  
  }


  onUpload(event, type) {
    
    if (this.fileSelected == undefined && this.fileSelected == null){
      this._snackBar.open('لم يتم اختيار صورة', 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    this.ngxSpinnerService.show();
    const fd = new FormData();

    switch (type) {
      case 'Certifications':
        fd.set('forms', this.fileSelected, this.fileSelected.name)

        this.authS.uplaodCertifications(fd).subscribe(results => {
          if (results.type === HttpEventType.UploadProgress) {
            console.log(Math.round(results.loaded / results.total * 100) + '%')
          } else if (results.type === HttpEventType.Response) {
            
            this._snackBar.open(results.body['message'], 'إغلاق', {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });

            this.getCertifications('c', null, null)
            this.fileSelected = null;
          }
        })
        this.ngxSpinnerService.hide();

        break;

      case 'Marks':
        fd.set('forms', this.fileSelected, this.fileSelected.name)

        this.authS.uplaodMarks(fd).subscribe(results => {
          if (results.type === HttpEventType.UploadProgress) {
            console.log(Math.round(results.loaded / results.total * 100) + '%')
          } else if (results.type === HttpEventType.Response) {

            this._snackBar.open(results.body['message'], 'إغلاق', {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });

            this.getMarks(null, 'm', null)
            this.fileSelected = null;
          }
        })
        this.ngxSpinnerService.hide();

        break;

      case 'Signatures':
        fd.set('forms', this.fileSelected, this.fileSelected.name)
        this.authS.uplaodSignatures(fd).subscribe(results => {
          if (results.type === HttpEventType.UploadProgress) {
            console.log(Math.round(results.loaded / results.total * 100) + '%')
          } else if (results.type === HttpEventType.Response) {
            
            this._snackBar.open(results.body['message'], 'إغلاق', {
              duration: 4000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });

            this.getSignatures(null, null, 's')
            this.fileSelected = null;
          }
        })
        this.ngxSpinnerService.hide();

        break;

        case 'Stamps':
          fd.set('forms', this.fileSelected, this.fileSelected.name)
          
          this.authS.uplaodStamps(fd).subscribe(results => {
            if (results.type === HttpEventType.UploadProgress) {
              console.log(Math.round(results.loaded / results.total * 100) + '%')
            } else if (results.type === HttpEventType.Response) {
              
              this._snackBar.open(results.body['message'], 'إغلاق', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });

              this.getStamps()
              this.fileSelected = null;
            }
          })
          this.ngxSpinnerService.hide();
  
          break;

    }

  }


  deleteImage(imaID, type) {
    this.ngxSpinnerService.show();

switch (type) {
  case 'certifications':
    this.authS.deleteCertifications(imaID).subscribe(results => {

      this._snackBar.open(results['message'], 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.getCertifications('c', null, null)

      this.ngxSpinnerService.hide();
    });
    break;

  case 'marks':
    this.authS.deleteMarks(imaID).subscribe(results => {

      this._snackBar.open(results['message'], 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.getMarks(null, 'm', null)

      this.ngxSpinnerService.hide();
    });
    break;

    case 'signatures':
      this.authS.deleteSignatures(imaID).subscribe(results => {

        this._snackBar.open(results['message'], 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
        this.getSignatures(null, null, 's')
  
        this.ngxSpinnerService.hide();
      });
    break;

    case 'stamp':
      this.authS.deleteStamps(imaID).subscribe(results => {

        this._snackBar.open(results['message'], 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.getStamps()
  
        this.ngxSpinnerService.hide();
      });
    break;

}


  }

  saveData(id, singN_AR, singN_EN, arName, enName ){

    if(singN_AR == '' || singN_EN == '' || arName == '' || enName == ''){
      this._snackBar.open('نقص في البيانات', 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }


    this.authS.certificationInfo(id, singN_AR, singN_EN, arName, enName).subscribe(results => {

      this._snackBar.open(results['message'], 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.ngxSpinnerService.hide();
    });


  }

  saveDataStamp(id, stampN){
    
    if(stampN == ''){
      console.log('نقص في البيانات')
      return;
    }
  

    this.authS.stampInfo(id, stampN).subscribe(results => {

      this._snackBar.open(results['message'], 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.ngxSpinnerService.hide();
    });

  }



  // ----------------- Courses Name ------------------------
saveCourses(data) {


  if(data.action == 'Add'){
    if(data.courseName == '' || data.courseName == undefined){
      this._snackBar.open('حقل "إسم الشهادة" فارغ', 'إغلاق', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
 
  }


  this.authS.saveCourses(data).subscribe(results => {

    this._snackBar.open(results['message'], 'إغلاق', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this.getCourses()
    this.ngxSpinnerService.hide();
  });
}

getCourses() { 
  let ELEMENT_DATA: PeriodicElement[] = [];

  this.ngxSpinnerService.show();

  this.authS.getCourses().subscribe(data =>{
    for(let i = 0; i< data['items'].length; i++){
      ELEMENT_DATA.push(
        { No: data['items'][i].id,
          courseName: data['items'][i].course_name,
          cr_title_AR: data['items'][i].cr_title_AR,
          cr_title_EN: data['items'][i].cr_title_EN,
          cr_text_M_AR: data['items'][i].cr_text_M_AR,
          cr_text_M_EN: data['items'][i].cr_text_M_EN,
          cr_text_F_AR: data['items'][i].cr_text_F_AR,
          cr_text_F_EN: data['items'][i].cr_text_F_EN,
          cr_Note_M_AR: data['items'][i].cr_Note_M_AR,
          cr_Note_M_EN: data['items'][i].cr_Note_M_EN,
          cr_Note_F_AR: data['items'][i].cr_Note_F_AR,
          cr_Note_F_EN: data['items'][i].cr_Note_F_EN,
          editDate: new Date(data['items'][i].updatedAt).toLocaleDateString(),
          createData: new Date(data['items'][i].createdAt).toLocaleDateString()
        });

    }
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    
    this.ngxSpinnerService.hide();

  })

}


deleteCourses(id) {
  this.authS.deleteCourses(id).subscribe(results => {

    this._snackBar.open(results['message'], 'إغلاق', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.getCourses()
    this.ngxSpinnerService.hide();
  });
}

editCourses(id, coursesN) {

  this.authS.editCourses(id, coursesN).subscribe(results => {

    this._snackBar.open(results['message'], 'إغلاق', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.getCourses()
    this.ngxSpinnerService.hide();
  });
}


}
