import { Component, OnInit } from '@angular/core';
import { friendSuggestions } from 'src/static-data/friend-suggestions';
import { FriendSuggestion } from '../social.component';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import icAddAPhoto from '@iconify/icons-ic/twotone-add-a-photo';
import icPhotoFilter from '@iconify/icons-ic/twotone-photo-filter';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';

@Component({
  selector: 'vex-social-timeline',
  templateUrl: './social-timeline.component.html',
  styleUrls: ['./social-timeline.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialTimelineComponent implements OnInit {

  suggestions = friendSuggestions;

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icAddAPhoto = icAddAPhoto;
  icPhotoFilter = icPhotoFilter;
  icAttachFile = icAttachFile;
  icKeyboardArrowRight = icKeyboardArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }
}
