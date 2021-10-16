import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'vex-new-rejester',
  templateUrl: './new-rejester.component.html',
  styleUrls: ['./new-rejester.component.scss']
})
export class NewRejesterComponent implements OnInit {
  siteLink = location.href.split(`${location.origin}/newRejester/`)[1]
  link: any = {};

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    this.apollo.watchQuery({
      query: gql`
          query coursesLinkRejecter($link: String){
          coursesLinkRejecter(link: $link){
            link
            courseId
            status
            level
          }
        }
        `,
        variables: {
          link: this.siteLink
        }
    }).valueChanges.subscribe(( {data}: any ) => {
      this.link.link = data.coursesLinkRejecter.link
      this.link.courseId = data.coursesLinkRejecter.courseId
      this.link.status = data.coursesLinkRejecter.status
      this.link.level = data.coursesLinkRejecter.level
    })


  }

}
