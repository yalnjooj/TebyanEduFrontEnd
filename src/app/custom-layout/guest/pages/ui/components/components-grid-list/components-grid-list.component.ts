import { Component, OnInit } from '@angular/core';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-components-grid-list',
  templateUrl: './components-grid-list.component.html',
  styleUrls: ['./components-grid-list.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ]
})
export class ComponentsGridListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
