import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDataFormDialog } from 'src/app/custom-layout/member/pages/apps/social/social-profile/social-profile.component';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icEye from '@iconify/icons-ic/remove-red-eye';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFocus from '@iconify/icons-ic/center-focus-strong';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icModule from '@iconify/icons-ic/view-module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { Subscription } from 'rxjs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';


  @Component({
    selector: 'vex-activities',
    templateUrl: './activities.component.html',
        styleUrls: ['../../tebyan-level1.component.scss']
  })
  export class ActivitiesComponent implements OnInit {
  
  icClose = icClose
  icEye = icEye
  icSearch = icSearch
  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icFocus = icFocus;
  icSettings = icSettings 
  icPrint = icPrint
  icModule = icModule
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  public dateValusesDate: Date[] = [];
  show = false;

  start_time: any;
  hours: any;

  courceName: any;

  beneficiaryType: any;
  beneficiaryTypeName: any;

  level: any;
  levelNumber: any;

  catagory: any;
  catagoryName: any;
  catagoryId: any;

  coache: any;
  coacheName: any;

  typePlace: any;
  typePlaceName: any;

  certificateModels: any;

  companyProfiles: any;
  companyProfilesName: any;

  coordinator: any;
  coordinatorName: any;

  trainingPlace: any;

  startTime: any
  test1: any
  test2: any
  oralTest: any
  writtenTest: any

  displayedColumns: string[] = [];
  columnsToDisplay: string[];
  dataSource: any;



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }





  ngOnInit(): void {

    let localData = [
      {
        '2021-08-10 00:00:00': 1,
        '2021-08-11 00:00:00': 2,
        '2021-08-12 00:00:00': 3,
        '2021-08-13 00:00:00': 4,
        '2021-08-14 00:00:00': 5,
      },
      {
        '2021-08-10 00:00:00': 6,
        '2021-08-11 00:00:00': 8,
        '2021-08-12 00:00:00': 9,
        '2021-08-13 00:00:00': 10,
        '2021-08-14 00:00:00': 115,
    }
  ];

    this.dataSource = [...localData]
    
    // console.log(this.data.courseNo)
    // console.log(this.data.userID)

    this.data.courcesDates.forEach(date => {
      this.displayedColumns.push(date)
      


    });
    this.columnsToDisplay = this.displayedColumns.slice();

    // this.displayedColumns.forEach((val, index) =>{

    //   this.dataSource.push({
    //     [`${val}`]:1
    //   });


    //   })
    //   console.log(this.dataSource)

    //     this.dataSource = [
    //   {'ت': 1, 'الأحد 24/ 2': 'Hydrogen', 'الإثنين 25/ 2': 1.0079},
    //   {'ت': 2, 'الأحد 24/ 2': 'Helium', 'الإثنين 25/ 2': 4.0026, },
    //   {'ت': 3, 'الأحد 24/ 2': 'Lithium', 'الإثنين 25/ 2': 6.941, },
    //   {'ت': 4, 'الأحد 24/ 2': 'Beryllium', 'الإثنين 25/ 2': 9.0122},
    //   {'ت': 5, 'الأحد 24/ 2': 'Boron', 'الإثنين 25/ 2': 5.5615},
    //   {'ت': 6, 'الأحد 24/ 2': 'Carbon', 'الإثنين 25/ 2': 12.0107},
    //   {'ت': 7, 'الأحد 24/ 2': 'Nitrogen', 'الإثنين 25/ 2': 14.0067},
    // ];

    // this.dataSource = [
    //   {'ت': 1, 'الأحد 24/ 2': 'Hydrogen', 'الإثنين 25/ 2': 1.0079},
    //   {'ت': 2, 'الأحد 24/ 2': 'Helium', 'الإثنين 25/ 2': 4.0026, },
    //   {'ت': 3, 'الأحد 24/ 2': 'Lithium', 'الإثنين 25/ 2': 6.941, },
    //   {'ت': 4, 'الأحد 24/ 2': 'Beryllium', 'الإثنين 25/ 2': 9.0122},
    //   {'ت': 5, 'الأحد 24/ 2': 'Boron', 'الإثنين 25/ 2': 5.5615},
    //   {'ت': 6, 'الأحد 24/ 2': 'Carbon', 'الإثنين 25/ 2': 12.0107},
    //   {'ت': 7, 'الأحد 24/ 2': 'Nitrogen', 'الإثنين 25/ 2': 14.0067},
    // ];

      // this.dataSource = [
      //   {'ت': 1, 'الأحد 24/ 2': 'Hydrogen', 'الإثنين 25/ 2': 1.0079, 'الثلاثاء 26/ 2': 'H' , 'آخر تحديث': 'H'},
      //   {'ت': 2, 'الأحد 24/ 2': 'Helium', 'الإثنين 25/ 2': 4.0026, 'الثلاثاء 26/ 2': 'He' , 'آخر تحديث': 'H'},
      //   {'ت': 3, 'الأحد 24/ 2': 'Lithium', 'الإثنين 25/ 2': 6.941, 'الثلاثاء 26/ 2': 'Li' , 'آخر تحديث': 'H'},
      //   {'ت': 4, 'الأحد 24/ 2': 'Beryllium', 'الإثنين 25/ 2': 9.0122, 'الثلاثاء 26/ 2': 'Be' , 'آخر تحديث': 'H'},
      //   {'ت': 5, 'الأحد 24/ 2': 'Boron', 'الإثنين 25/ 2': 10.811, 'الثلاثاء 26/ 2': 'B' , 'آخر تحديث': 'H'},
      //   {'ت': 6, 'الأحد 24/ 2': 'Carbon', 'الإثنين 25/ 2': 12.0107, 'الثلاثاء 26/ 2': 'C' , 'آخر تحديث': 'H'},
      //   {'ت': 7, 'الأحد 24/ 2': 'Nitrogen', 'الإثنين 25/ 2': 14.0067, 'الثلاثاء 26/ 2': 'N' , 'آخر تحديث': 'H'},
      //   {'ت': 8, 'الأحد 24/ 2': 'Oxygen', 'الإثنين 25/ 2': 15.9994, 'الثلاثاء 26/ 2': 'O' , 'آخر تحديث': 'H'},
      //   {'ت': 9, 'الأحد 24/ 2': 'Fluorine', 'الإثنين 25/ 2': 18.9984, 'الثلاثاء 26/ 2': 'F' , 'آخر تحديث': 'H'},
      //   {'ت': 10, 'الأحد 24/ 2': 'Neon', 'الإثنين 25/ 2': 20.1797, 'الثلاثاء 26/ 2': 'Ne' , 'آخر تحديث': 'H'},
      // ];

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;


  deleteCourse(courseNo){}

}



