import { AuthService } from './auth.service';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthHomePageGuard implements CanActivate {

  constructor(private apollo: Apollo, private router: Router) { }

  canActivate(ntext: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
console.log(state)
      this.apollo.watchQuery({
        query: gql`
          query{
            isAuthenticated
          }
        `
      }).valueChanges.subscribe(value => {

        console.log('home')

        if (value.data['isAuthenticated']) {
          console.log(value.data['isAuthenticated'])
          console.log('توجد بيانات')
          this.router.navigate(['/dashboard'])
          resolve(false)
        } else {
          console.log(value.data['isAuthenticated'])
          console.log('لا توجد بيانات')
          
          resolve(true)
        }

      }, (err) => {
        console.log('home')

        console.log(err)
      });


      /*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise(resolve => {

      this.apollo.watchQuery({
        query: gql`
          query{
            currentUser{
              id
              email
            }
          }
        `
      }).valueChanges.subscribe(value => {
        console.log(value.data['currentUser'])
        if (value.data['currentUser']) {
          this.router.navigate(['/dashboard']); 
          resolve(false)
        } else {
          resolve(true)
        }

        
        

      }, (err) => {
        
      });

    })
}
      */

    })
  }
  ngOnInit() {

  }



}
