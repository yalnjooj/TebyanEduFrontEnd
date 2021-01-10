import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  rates: any[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
        query: gql`
          {
            course(uID: ${1}){
            place
            hours
            price
            certificate{
              id
              certificateName{
                name
              }
            }
            coache{
              name
            }
            category{
              name
            }
          }
          }
        `
      }).valueChanges.subscribe(result => {

        if(result.error) console.log(result.error)
        else console.log(result.data['course'])
         

      });
  }






}


// put تستخدم لتغيير البيانات الموجودة في الرابط
// post تستخدم لاضافة بيانات جديدة على الرابط
// patch تستخدم للتحديث على بعض الخصائص
