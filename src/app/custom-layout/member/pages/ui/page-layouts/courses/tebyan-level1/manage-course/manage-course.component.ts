import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDataFormDialog } from 'src/app/custom-layout/member/pages/apps/social/social-profile/social-profile.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['../tebyan-level1.component.scss']
})
export class ManageCourseComponent implements OnInit {

  icClose = icClose


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

  
  constructor(
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxSpinnerService: NgxSpinnerService,
    public dialogRef: MatDialogRef<ChangeDataFormDialog>) { }


  ngOnInit(): void {
   

    this.apollo.watchQuery({
      query: gql`
          query mexCourseTables{
          mexCourseTables{
            courceName{
              id
              name
            }
            beneficiaryType{
              id
              companyType
            }
            level{
              id
              name
            }
            catagory{
              id
              name
            }
            coache{
              id
              name
            }
            typePlace{
              id
              name
            }
            certificateModels{
              id
              certificatename
            }
            companyProfiles{
              id
              companyName
            }
          }
        }
        `
    }).valueChanges.subscribe(( {data}: any ) => {
  
      this.courceName = data.mexCourseTables.courceName.filter((value, index, array)=>{
       return parseInt(value.id) == 5 || parseInt(value.id) == 6
      })
  
      this.beneficiaryType = data.mexCourseTables.beneficiaryType.filter((value, index, array)=>{
        return parseInt(value.id) == 7 || parseInt(value.id) == 3
       })
  
      this.level = data.mexCourseTables.level.filter((value, index, array)=>{
        return parseInt(value.id) == 1 || parseInt(value.id) == 3
       })
       
      this.catagory = data.mexCourseTables.catagory
      this.coache = data.mexCourseTables.coache
      this.typePlace = data.mexCourseTables.typePlace
      this.certificateModels = data.mexCourseTables.certificateModels
      this.companyProfiles = data.mexCourseTables.companyProfiles
  
  
      
      this.apollo.watchQuery({
        query: gql`
            query courseID($id: Int!){
              courseID(id: $id){
              status
              courcesDates
              hours
              start_time
              test_1
              test_2
              oral_test
              written_test
              
              level_id
              catagory_id
              coache_id
              type_place_id
              company_type_id
              
              courcesExtend1{
                courceId
                companyProfilesId
                coordinatorId
                trainingPlace
              }
              
              certificates_1_id
              certificates_2_id
              certificates_3_id
            }
          }
          `,
          variables: {
            id: parseInt(this.data.courseNo)
          }
      }).valueChanges.subscribe( async ( {data}: any ) => {

      //  this.dateValusesDate = [new Date('8/8/2020'), new Date('8/8/2020'), new Date('8/9/2020')];
       this.dateValusesDate = JSON.parse(data.courseID.courcesDates).map( dateString => new Date(dateString) )
       
       data.courseID.company_type_id == 3? this.show = true : this.show = false;

       this.catagoryName = this.catagory.filter((value, index, array)=>{
        return parseInt(value.id) == parseInt(data.courseID.catagory_id)
       })

       this.catagoryId = this.catagoryName[0].id
       this.catagoryName = this.catagoryName[0].name

       this.levelNumber = this.level.filter((value, index, array)=>{
        return parseInt(value.id) == parseInt(data.courseID.level_id)
       })
        this.levelNumber = this.levelNumber[0].name

        this.typePlaceName = this.typePlace.filter((value, index, array)=>{
          return parseInt(value.id) == parseInt(data.courseID.type_place_id)
         })
         this.typePlaceName = this.typePlaceName[0].name

         this.start_time = data.courseID.start_time
         this.hours = data.courseID.hours

         this.coacheName = this.coache.filter((value, index, array)=>{
          return parseInt(value.id) == parseInt(data.courseID.coache_id)
         })
         this.coacheName = this.coacheName[0].name

         if(data.courseID.company_type_id == 3){

                    this.trainingPlace = data.courseID.courcesExtend1.trainingPlace


          
                     this.companyProfilesName = this.companyProfiles.filter((value, index, array)=>{
                      return parseInt(value.id) == parseInt(data.courseID.courcesExtend1.companyProfilesId)
                     })
                     this.companyProfilesName = this.companyProfilesName[0].companyName

                     this.getCoordinator(data.courseID.courcesExtend1.companyProfilesId, data.courseID.courcesExtend1.coordinatorId)

         } else {
          this.trainingPlace = 'لا يوجد'
          this.companyProfilesName = 'لا يوجد'
          this.coordinatorName = 'لا يوجد'
         }
         
        this.beneficiaryTypeName = this.beneficiaryType.filter((value, index, array)=>{
          return parseInt(value.id) == parseInt(data.courseID.company_type_id)
          })
          this.beneficiaryTypeName = this.beneficiaryTypeName[0].companyType


         this.test1 = data.courseID.test_1.toString()
         this.test2 = data.courseID.test_2.toString()
         this.oralTest = data.courseID.oral_test.toString()
         this.writtenTest = data.courseID.written_test.toString()
 

      })


      // console.log(this.dataSourse.courcesExtend1.companyProfilesId)
      // console.log(this.dataSourse.courcesExtend1.coordinatorId)
      // console.log(this.dataSourse.courcesExtend1.trainingPlace)
  
      this.ngxSpinnerService.hide()
  
  })

    
  }


  getCoordinator(companyId, coordinatorId){

    this.ngxSpinnerService.show()

    this.apollo.watchQuery({
      query: gql`
          query coordinator($companyprofile_id: ID!){
            coordinator(companyprofile_id: $companyprofile_id){
              _01_personal{
                id
                name_AR
              }
            }
        }
        `,
        variables: {
          companyprofile_id: companyId
        }
    }).valueChanges.subscribe( async( {data}: any ) => {

      this.coordinatorName = data.coordinator.filter((value, index, array)=>{
        return parseInt(value._01_personal.id) == parseInt(coordinatorId)
       })

       this.coordinatorName = this.coordinatorName[0]._01_personal.name_AR

    })
  


    this.ngxSpinnerService.hide()
  }


}
