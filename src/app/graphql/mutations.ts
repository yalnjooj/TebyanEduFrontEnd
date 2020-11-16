import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';


@Injectable()
export class Mutations {
  constructor(private apollo: Apollo) { }



  createUser(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createUser($email: String! $password: String!){
                    createUser(email: $email, password: $password){
                        id
                    }
          }
  `,
      variables: {
        email: email,
        password: password
      }
    })
  }


}
