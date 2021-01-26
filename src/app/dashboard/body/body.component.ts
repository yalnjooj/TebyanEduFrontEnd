import { Apollo } from 'apollo-angular';
import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { blub } from 'apollo-upload-client';
@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  id: any;
  email: any;
  email2: any;
  public obj: any = {
    changer: 1
  };

  private gqlUrl = "http://localhost:3000/api/on/this/url"

  constructor(private http: HttpClient, private router: Router, private apollo: Apollo, private ngxSpinnerService: NgxSpinnerService) { }
  ngOnInit() {


    let subscripe = this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              id
              email
            }
      }
      `
    }).valueChanges.subscribe(({ data }) => {

      this.email = data['currentUser'].email;
      this.id = data['currentUser'].id;

    })
    // subscripe.unsubscribe()
  }


  subscripe(id) {

    this.apollo.subscribe({
      query: gql`
        subscription userUpdated($id: ID!) {
          userUpdated(id: $id){
            id
            email
          }
        }
      `,
      variables: { id: id }
    }).subscribe(data => {
      console.log(data.data['userUpdated'].email)
      this.email2 = data.data['userUpdated'].email
    })

  }

  upload($event) {

    const files = $event.target.files


    const uploadFileMutation = gql`
      mutation uploadFiles($file: Upload!) {
        uploadFiles(file: $file)
}
`





    this.apollo.mutate({
      mutation: uploadFileMutation,
      variables: {
        file: files
      },
      context: {
        useMultipart: true
      }
    }).subscribe(
      (data) => {
        console.log(data)
      });



  }


}
