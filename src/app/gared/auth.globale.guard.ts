import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGlobalGuard implements CanActivate {
  private querySubscription: Subscription;

  roles = {
    DASHBOARD: 'DASHBOARD',
    GLOBALE: 'GLOBALE'
  }
  constructor(private apollo: Apollo, private router: Router, private cookieService: CookieService) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {


    return new Promise((resolve, reject) => {

      this.apollo.watchQuery<any>({
        query: gql`
          query{
            isAuthenticated
          }
        `
      }).valueChanges.pipe(map(value => {

        switch (next.data[0]) {

          case this.roles.DASHBOARD:
            if (this.cookieService.check('tebyanSession')) {
              

              resolve(true)
            } else {

              resolve(false)
              this.router.navigate(['/login'])
            }
            break;

          case this.roles.GLOBALE:
            if (this.cookieService.check('tebyanSession')) {

              this.router.navigate(['/dashboard'])
              resolve(false)
            } else {
              resolve(true)
            }
            break;
        }


      })).toPromise()
    })
  }
}
