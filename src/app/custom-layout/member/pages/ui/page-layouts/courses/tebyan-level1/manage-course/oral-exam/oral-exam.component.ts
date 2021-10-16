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
  selector: 'vex-oral-exam',
  templateUrl: './oral-exam.component.html',
    styleUrls: ['../../tebyan-level1.component.scss']
})
export class OralExamComponent implements OnInit {  icClose = icClose
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
  oralExam: any

  displayedColumns: string[] = [];
  columnsToDisplay: string[];
  dataSource: any;
  dataFromServer: any;
  localValue: number
  arraeis30: number [] = new Array(31);
  arraeis10: number [] = new Array(11);
  arraeis5: number [] = new Array(6);
  arraeis20: number [] = new Array(21);
  maxLength: number = 0

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() set dataFromOralExams(oralExamBasicData: any){

    
    this.ngxSpinnerService.show()


    if(oralExamBasicData?.oralExamBasicData){
    this.localValue = oralExamBasicData?.levelNumber

      this.dataFromOralExam(oralExamBasicData.oralExamBasicData)

    }

    this.ngxSpinnerService.hide()

  };

  stas = true
  dataFromOralExam(localValue){
    
    if(this.stas){
    this.displayedColumns.push('ت')
    this.displayedColumns.push('اسم المتدرب')
    this.displayedColumns.push('حالات الحروف')
    this.displayedColumns.push('القراءة المباشرة')
    this.displayedColumns.push('التهجي')
    this.localValue == 1? null : this.displayedColumns.push('التلاوة')
    this.displayedColumns.push('طرق التدريس')
    this.displayedColumns.push('المجموع')
  }
  this.stas = false

    for (let index = 0; index < localValue.length; index++) {
        let element = localValue[index];

        localValue[index]['ت'] = index +1
        localValue[index]['اسم المتدرب'] = element.name
        localValue[index]['حالات الحروف'] = element.caseLetters
        localValue[index]['القراءة المباشرة'] = element.directReading
        localValue[index]['التهجي'] = element.spelling
        this.localValue == 1? null : localValue[index]['التلاوة'] = element.recitation
        localValue[index]['طرق التدريس'] = element.teachingMethods
        localValue[index]['المجموع'] = (JSON.parse(element.caseLetters) + JSON.parse(element.directReading)+ JSON.parse(element.spelling) + JSON.parse(element.recitation) + JSON.parse(element.teachingMethods))

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
  
                case_Letters
                direct_Reading
                spelling
                recitation
                teaching_Methods

                student{
                  id
                  name_AR
                }

              }
            }
            `,
            variables:{
              courseDetailsId: parseInt(courseDetailsId),
              tabId: 'oralExam',
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
              caseLetters: element.case_Letters,
              directReading: element.direct_Reading,
              spelling: element.spelling,
              recitation: element.recitation,
              teachingMethods: element.teaching_Methods,
            })
            
          }

          this.dataFromOralExam(e)
  
          this.ngxSpinnerService.hide()
      
      
      })
  

  

    }



  ngOnInit(): void {




  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;


  deleteCourse(courseNo){}

}









