import { Component, OnInit } from '@angular/core';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-components-snack-bar',
  templateUrl: './components-snack-bar.component.html',
  styleUrls: ['./components-snack-bar.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class ComponentsSnackBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
