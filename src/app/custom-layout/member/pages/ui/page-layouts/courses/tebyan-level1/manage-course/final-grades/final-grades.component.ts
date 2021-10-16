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
import { Observable } from 'rxjs';


@Component({
  selector: 'vex-final-grades',
  templateUrl: './final-grades.component.html',
  styleUrls: ['../../tebyan-level1.component.scss']
})
export class FinalGradesComponent implements OnInit {
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
  oralExam: any

  displayedColumns: string[] = [];
  columnsToDisplay: string[];
  dataSource: any;
  dataFromServer: any;
  localValue: any
  arraeis: number [] = [];
  maxLength: number = 0

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input() set toDataToFinalGrades(data: any){

    if(data){
          console.log(data)

    }
  }
  @Input() set dataFromFinalGrades(finalGrades: any){

    this.ngxSpinnerService.show()


    if(finalGrades){
    this.localValue = finalGrades


    }

    this.ngxSpinnerService.hide()

  };

  dataFromOralExam(localValue){
    

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

  
  private eventsSubscriptionAc: Subscription;
  @Input() events: Observable<any>;


  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }


    ngOnDestroy(): void {
      this.eventsSubscriptionAc?.unsubscribe();
    }



  ngOnInit(): void {

    this.displayedColumns.push('ت')
    this.displayedColumns.push('اسم المتدرب')

    this.displayedColumns.push('درجة الحضور')
    this.displayedColumns.push('درجة المشاركات اليومية')
    this.displayedColumns.push('درجة الانشطة المنزلية')
    this.displayedColumns.push('درجة الاختبارات القصيرة')
    this.displayedColumns.push('المعدل')

    this.displayedColumns.push('درجة الاختبار الشفهي')
    this.displayedColumns.push('درجة الاختبار التحريري')

    this.displayedColumns.push('المجموع')
    this.displayedColumns.push('التقدير')

    this.displayedColumns.push('إعادة الاختبار')



    this.eventsSubscriptionAc = this.events.subscribe(() => {

      this.apollo.watchQuery({
        query: gql`
            query coursesdetailsANDdates($coursesId: Int!) {
              coursesdetailsANDdates(coursesId: $coursesId) {
                  coursesdetails{
                    id
                    studentId
      
                    case_Letters
                    direct_Reading
                    spelling
                    recitation
                    teaching_Methods
      
                    short_test1
                    short_test2
      
                    written_test
      
                    coursesId
                    student{
                      id
                      name_AR
                      idnfcation
                    }
                }
                courcesDatesValues{
                  id
                  cource_id
                  tabId
                  studentId
                  cource_dateId
                  value
                }
              }
          }
          `,
          variables: {
            coursesId: parseInt(this.data.courseNo)
          }
      }).valueChanges.subscribe( async ( {data}: any ) => {

        let studentsData: any = [];
        data.coursesdetailsANDdates.courcesDatesValues
        data.coursesdetailsANDdates.coursesdetails
         
        for (let index = 0; index < data.coursesdetailsANDdates.coursesdetails.length; index++) {
          const coursesdetails = data.coursesdetailsANDdates.coursesdetails[index];
          let attendance: any = 0;
          let participations: any = 0;
          let activities: any = 0;

          for (let index0 = 0; index0 < data.coursesdetailsANDdates.courcesDatesValues.length; index0++) {
            const courcesDatesValues = data.coursesdetailsANDdates.courcesDatesValues[index0];

              if(coursesdetails.studentId == courcesDatesValues.studentId){

                switch (courcesDatesValues.tabId) {
                  case 'attendance':
                    attendance += courcesDatesValues.value
                    break;
                    
                  case 'participations':
                    participations += courcesDatesValues.value
                    break;

                  case 'activities':
                    activities += courcesDatesValues.value
                    break;
                  }
              }

          }

          
          const final: any = Math.ceil((( (JSON.parse(coursesdetails.short_test1) + JSON.parse(coursesdetails.short_test2))  / 2) + ( JSON.parse(activities) + JSON.parse(participations) + JSON.parse(attendance) )) / 2  +
                                (JSON.parse(coursesdetails.case_Letters) + JSON.parse(coursesdetails.direct_Reading) + JSON.parse(coursesdetails.spelling) + JSON.parse(coursesdetails.teaching_Methods)) +
                                 JSON.parse((coursesdetails.written_test) + JSON.parse(coursesdetails.recitation) ));

          let result: string
          if((final >= 90) && (final <= 100)){
            result = 'ممتاز'
          } else if((final >= 85) && (final <= 89)){
            result = 'جيد جداً'
          } else if(final <= 84){
            result = 'غير مجتازة'
          }

          studentsData.push({
              'ت': index + 1,
              studentId: JSON.parse(coursesdetails.studentId),
              'اسم المتدرب': coursesdetails.student.name_AR,
              'درجة الحضور': (JSON.parse(attendance) / 2).toFixed(1),
              'درجة المشاركات اليومية': (JSON.parse(participations) / 2).toFixed(1),
              'درجة الانشطة المنزلية': (JSON.parse(activities) / 2).toFixed(1),
              'درجة الاختبارات القصيرة': (( (JSON.parse(coursesdetails.short_test1) + JSON.parse(coursesdetails.short_test2))  / 2)  / 2).toFixed(1),
              'المعدل': ((((JSON.parse(coursesdetails.short_test1) + JSON.parse(coursesdetails.short_test2))  / 2) + ( JSON.parse(activities) + JSON.parse(participations) + JSON.parse(attendance) )) / 2).toFixed(1),
              'درجة الاختبار الشفهي': JSON.parse(coursesdetails.case_Letters) + JSON.parse(coursesdetails.direct_Reading) + JSON.parse(coursesdetails.spelling) + JSON.parse(coursesdetails.teaching_Methods) + JSON.parse(coursesdetails.recitation),
              'التقدير': result,
              'درجة الاختبار التحريري': JSON.parse(coursesdetails.written_test),
              'المجموع': final
            })
        }
       
        
        this.dataSource = studentsData
      })

    });




  }




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





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;


  deleteCourse(courseNo){}

}









