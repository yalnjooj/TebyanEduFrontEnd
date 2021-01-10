import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private apollo: Apollo, private ngxSpinnerService: NgxSpinnerService) { }
  data: any;
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              id
              email
            }
      }
      `
    }).valueChanges.subscribe(data => {

      if (!data.data['currentUser']) {
        this.cookieService.delete('tebyanSession', '/')
        this.router.navigate(['/home'])
        return
      }

      this.data = data;
    })
  }

}
