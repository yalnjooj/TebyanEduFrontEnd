import { Component, Inject, Input, OnInit, ViewChild, AfterContentInit } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'vex-short-tests',
  templateUrl: './short-tests.component.html',
  styleUrls: ['./short-tests.component.scss']
})
export class ShortTestsComponent implements OnInit {
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

  unsubscription6: any

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
  dataFromServer: any;
  localValue: any
  arraeis: number [] = new Array(16);
  maxLength: number = 0

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() set dataFromShortTests(shortTestsBasicData: any){

    
    this.ngxSpinnerService.show()


    if(shortTestsBasicData?.shortTestsBasicData){

      this.dataFromShortTest(shortTestsBasicData.shortTestsBasicData)

    }

    this.ngxSpinnerService.hide()

  };

  dataFromShortTest(localValue){

      for (let index = 0; index < localValue.length; index++) {
        let element = localValue[index];

        localValue[index]['ت'] = index +1
        localValue[index]['اسم المتدرب'] = element.name
        localValue[index]['الاختبار الأول'] = element.shortTest1
        localValue[index]['الاختبار الثاني'] = element.shortTest2
        localValue[index]['المجموع'] = (JSON.parse(element.shortTest2) + JSON.parse(element.shortTest1)) / 2

      }
  
      
    this.dataSource = localValue
    


  
  }

  
  constructor(
    public sanitizer:DomSanitizer,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }




    op(val, column, courseDetailsId){
  
        this.apollo.mutate({
          mutation: gql`
            mutation updateCoursesdetails($column: String $value: String $courseDetailsId: Int $courseNo: Int){
              updateCoursesdetails(column: $column value: $value courseDetailsId: $courseDetailsId courseNo: $courseNo){
                id
  
                short_test1
                short_test2

                student{
                  id
                  name_AR
                }

              }
            }
            `,
            variables:{
              courseDetailsId: parseInt(courseDetailsId),
              tabId: 'shortTests',
              column,
              value: val.target.value.toString(),
              courseNo: parseInt(this.data.courseNo)
            }
        }).subscribe(( {data}: any ) => {
          
         let e: any = []

          for (let index = 0; index < data.updateCoursesdetails.length; index++) {
            const element = data.updateCoursesdetails[index];

            e.push({
              courseDetailsId: element.id,
              name: element.student.name_AR,
              shortTest1: element.short_test1,
              shortTest2: element.short_test2,
            })
            
          }

          this.dataFromShortTest(e)
  
          this.ngxSpinnerService.hide()
      
      
      })
  

    }



  ngOnInit(): void {

    this.displayedColumns.push('ت')
    this.displayedColumns.push('اسم المتدرب')
    this.displayedColumns.push('الاختبار الأول')
    this.displayedColumns.push('الاختبار الثاني')
    this.displayedColumns.push('المجموع')



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;


  deleteCourse(courseNo){}

}








