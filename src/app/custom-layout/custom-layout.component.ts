import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vex-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit {

constructor(private router: Router){}
ngOnInit(){}

test(){
this.router.navigate(['/login'])
} 

}
