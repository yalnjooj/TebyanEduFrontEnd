import { Component, OnInit } from '@angular/core';
import { Link } from 'src/@vex/interfaces/link.interface';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {
  companyName: string;
  avatar: string;
  createdAt: Date
  links: Link[] = [
    {
      label: 'ملف التعريف الشخصي',
      route: './',
      routerLinkActiveOptions: { exact: true }
    }
  ];
  // ,
  // {
  //   label: 'TIMELINE',
  //   route: './timeline'
  // },
  // {
  //   label: 'FRIENDS',
  //   route: '',
  //   disabled: true
  // },
  // {
  //   label: 'PHOTOS',
  //   route: '',
  //   disabled: true
  // }
  constructor(private apollo: Apollo,
              private router: Router) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
          query{
            currentUser{
              companyName
              avatar
              createdAt
            }
        }
        `
}).valueChanges.subscribe( ( {data}: any ) => {

    this.companyName = data.currentUser.companyName,
    this.avatar = data.currentUser.avatar
    this.createdAt = data.currentUser.createdAt
  
})
  }
}
