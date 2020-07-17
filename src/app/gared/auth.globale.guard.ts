import { AuthService } from './auth.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGlobalGuard implements CanActivate {

  constructor(private authUser: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean>{

    return new Promise(resolve =>{
        this.authUser.isAuthenticate().subscribe(user =>{
          if(user['STATUS']) {

        resolve(true);
          }

        else {
          resolve(false)
        this.router.navigate(['/login'])
        }

        },err =>{
          console.log('ERROR: ',err)
        })



  })
}


}
