import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-firs-test',
  templateUrl: './firs-test.component.html',
  styleUrls: ['./firs-test.component.css']
})
export class FirsTestComponent implements OnInit {

  @Input() home ;
  constructor() { }

  ngOnInit(): void {

  }



}
