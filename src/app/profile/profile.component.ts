import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ContentChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @ViewChild('myTest') myTest;
  @ContentChild('conCiled') conCiled;
  constructor( private routes: ActivatedRoute, private router: Router) {
      // routes.paramMap.subscribe(params =>{
      //   console.log(params.get('id'))
      // })
   }

  ngOnInit(): void {}
  ngAfterContentInit(){console.log(this.conCiled.nativeElement.innerHTML)}
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {}

  goHome(){
    this.router.navigate([''], {queryParams: {id: 1}})
  }

}
