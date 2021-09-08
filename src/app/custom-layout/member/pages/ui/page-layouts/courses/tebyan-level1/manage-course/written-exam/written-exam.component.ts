import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/print';
import { Subscription } from 'rxjs';

  @Component({
    selector: 'vex-written-exam',
    templateUrl: './written-exam.component.html',
        styleUrls: ['../../tebyan-level1.component.scss']
  })
  export class WrittenExamComponent implements OnInit {
  
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

  displayedColumns: string[] = ['id', 'courseNo',  'level', 'updatedAt'];
  dataSource: any
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }





  ngOnInit(): void {
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewStudent(){}

  deleteCourse(courseNo){}

}

