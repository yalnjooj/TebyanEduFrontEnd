import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icArchive from '@iconify/icons-ic/twotone-archive';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icGrade from '@iconify/icons-ic/twotone-grade';
import faFacebook from '@iconify/icons-fa-brands/facebook-f';
import faTwitter from '@iconify/icons-fa-brands/twitter';
import faInstagram from '@iconify/icons-fa-brands/instagram';
import faPinterest from '@iconify/icons-fa-brands/pinterest-p';
import faGithub from '@iconify/icons-fa-brands/github';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { colors } from 'src/static-data/colors';

@Component({
  selector: 'vex-components-buttons',
  templateUrl: './components-buttons.component.html',
  styleUrls: ['./components-buttons.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class ComponentsButtonsComponent implements OnInit {

  icSettings = icSettings;
  icArchive = icArchive;
  icFavorite = icFavorite;
  icGrade = icGrade;

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faPinterest = faPinterest;
  faInstagram = faInstagram;
  faGithub = faGithub;

  colors = colors;

  constructor() { }

  ngOnInit() {
  }

}
