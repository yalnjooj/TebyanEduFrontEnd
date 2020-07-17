import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService} from '@cime/ngx-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';

  
@Component({
  selector: 'app-navbar-out',
  templateUrl: './navbar-out.component.html',
  styleUrls: ['./navbar-out.component.css']
})
export class NavbarOutComponent implements OnInit {

  constructor(private router: Router, private slimLoadingBarService: SlimLoadingBarService) {

  //   this.router.events.subscribe( (event: Event) => {



  // });

  }

  ngOnInit(): void {
  }




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
