import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';


@Injectable()
export class Queries {
  constructor(private apollo: Apollo) { }



  logout() {
    return this.apollo.watchQuery({
      query: gql`
        query{
          logout
        }
      `
    })
  }


}