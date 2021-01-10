import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class Subscriptions extends Subscription {

  document = gql`
    subscription messageReceived {
      messageReceived{
    id
  }
    }
  `;
}