import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { loadCldr} from '@syncfusion/ej2-base';

declare var require: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/ar/ca-gregorian.json'),
    require('cldr-data/main/ar/numbers.json'),
    require('cldr-data/main/ar/timeZoneNames.json'),
    require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {



  constructor(private router: Router, private slimLoadingBarService: SlimLoadingBarService ){

  //   this.router.events.subscribe( (event: Event) => {

  //  this.navigationInterceptor(event);



  // });







  }


  ngOnInit(){ }



    // Angular Slim Loading Bar
    // navigationInterceptor(event: Event): void {

    //   if (event instanceof NavigationStart) {
    //     this.slimLoadingBarService.start(() => {
    //       console.log('Loading start');
    //   });
    //   }
    //   if (event instanceof NavigationEnd) {
    //     this.slimLoadingBarService.complete();
    //     console.log('Loading complete');

    //   }
    //   if (event instanceof NavigationCancel) {
    //     this.slimLoadingBarService.stop();
    //     console.log('Loading stop');

    //   }
    //   if (event instanceof NavigationError) {
    //     this.slimLoadingBarService.stop();
    //     console.log('Loading error');

    //   }
    // }






}

