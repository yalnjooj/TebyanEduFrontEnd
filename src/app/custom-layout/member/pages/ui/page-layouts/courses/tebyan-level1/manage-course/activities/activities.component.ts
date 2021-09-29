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
  arraeis: number [] = [];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() set dataFromActivities(localValue: any){

    this.localValue = localValue
    
    this.ngxSpinnerService.show()



    if(localValue){




      this.dataFromActivitie(localValue)


    }

            

    this.ngxSpinnerService.hide()
  };

  dataFromActivitie(localValue: any){


    this.apollo.watchQuery({
      query: gql`
          query courcesDatesValues($courseNo: Int!) {
            courcesDatesValues(courseNo: $courseNo) {
              id
              cource_id
              tabId
              studentId
              cource_dateId
              value
            }
        }
        `,
        variables: {
          courseNo: parseInt(this.data.courseNo)
        }
    }).valueChanges.subscribe( async ( {data}: any ) => {
      this.dataFromServer = data
    })

    this.apollo.watchQuery({
      query: gql`
          query courcesDatesValues($courseNo: Int!) {
            courcesDatesValues(courseNo: $courseNo) {
              id
              cource_id
              tabId
              studentId
              cource_dateId
              value
            }
        }
        `,
        variables: {
          courseNo: parseInt(this.data.courseNo)
        }
    }).valueChanges.subscribe( async ( {data}: any ) => {
      this.dataFromServer = data

      this.dataFromServer.courcesDatesValues.forEach( datesSarver => {

        for (let index = 0; index < localValue.length; index++) {
          const element = localValue[index];
  
          if(datesSarver.studentId == element.studentId){
  
            localValue[index][datesSarver.cource_dateId] = datesSarver.value 
  
          }
  
        }
  
      })
  
  
      localValue.forEach((element, index) => {
  
          localValue[index]['ت'] = index +1
          localValue[index]['اسم المتدرب'] = element.name
  
              let sum: number = 0
          for( var key in element ){
              if(!isNaN(Date.parse(key))){
                
            sum +=localValue[index][key]
  
              }
          }
  
          localValue[index]['درجة المشاركة'] = sum.toFixed(1)
  
  
      });
  
      
  
    this.dataSource = localValue

    })


  
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





  op(val, column, studentId, status){

    this.ngxSpinnerService.show()

    if (!status) {

      this.apollo.mutate({
        mutation: gql`
          mutation createCourcesDatesValues($courseNo: Int! $tabId: String! $studentId: Int! $column: String! $value: String!){
            createCourcesDatesValues(courseNo: $courseNo tabId: $tabId studentId: $studentId column: $column value: $value){
              id
            }
          }
          `,
          variables:{
            courseNo: parseInt(this.data.courseNo),
            tabId: 'activities',
            studentId,
            column,
            value: val.target.value,          
          }
      }).subscribe(( {data}: any ) => {
    
    
        this.apollo.watchQuery({
          query: gql`
              query courcesDatesValues($courseNo: Int!) {
                courcesDatesValues(courseNo: $courseNo) {
                  id
                  cource_id
                  tabId
                  studentId
                  cource_dateId
                  value
                }
            }
            `,
            variables: {
              courseNo: parseInt(this.data.courseNo)
            }
        }).valueChanges.subscribe( async ( {data}: any ) => {
          this.dataFromServer = data
        })
        
        this.dataFromActivitie(this.localValue)

        this.ngxSpinnerService.hide()
    
    
    })

    } else {
      
      this.apollo.mutate({
        mutation: gql`
          mutation updateCourcesDatesValues($courseNo: Int! $tabId: String! $studentId: Int! $column: String! $value: String!){
            updateCourcesDatesValues(courseNo: $courseNo tabId: $tabId studentId: $studentId column: $column value: $value){
              id
            }
          }
          `,
          variables:{
            courseNo: parseInt(this.data.courseNo),
            tabId: 'activities',
            studentId,
            column,
            value: val.target.value,          
          }
      }).subscribe(( {data}: any ) => {
    
    

                  this.dataFromActivitie(this.localValue)

        this.ngxSpinnerService.hide()
    
    
    })

    }

  }


  ngOnInit(): void {

    this.displayedColumns.push('ت')
    this.displayedColumns.push('اسم المتدرب')
    this.data.courcesDates.forEach(date => {
      this.displayedColumns.push(date)
    });
    this.displayedColumns.push('درجة المشاركة')

    let deg = ( 15 / this.data.courcesDates.length) + 1

    for (let index = 0; index < deg; index++) {
      this.arraeis.push(index)
    }



    


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  afterClosed: Subscription;


  deleteCourse(courseNo){}

}



