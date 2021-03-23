import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Role } from 'src/app/tools/roles'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  observer;
  constructor(private apollo: Apollo, private router: Router) { }


  async isRouted(navigationData, resolve, gardRole) {

    navigationData = typeof navigationData;

    
    this.observer = await this.apollo.watchQuery<any>({
      query: gql`
        query{
          isAuthenticated
        }
      `
    }).valueChanges.subscribe(( {data}: any ) => {
  let isAuthenticated
  let role

if(data.isAuthenticated){
  isAuthenticated = JSON.parse(data.isAuthenticated.split('**')[0])
} else {
  isAuthenticated = data.isAuthenticated
}

      switch (gardRole) {
        case Role.COMING_SOON:
  
          if (isAuthenticated) {
            resolve(false)
            role = JSON.parse(data.isAuthenticated.split('**')[1])

            switch (role) {
              case Role.ADMIN:
                this.router.navigate(['/admin'])
                break
  
              case Role.MEMBER:
                this.router.navigate(['/member'])
                break
  
              case Role.GUEST:
                this.router.navigate(['/guest'])
                break
            }
          } else {
            resolve(false)
            this.router.navigate(['/home'], {
              state: { data: Role.COMING_SOON },
            })
          }
          break;
  
  
  
            case Role.FORGOT_PASSWORD:
            case Role.HOME:
            case Role.REGISTER:
            case Role.RESET_PASSWORD:
            if ((navigationData == 'string') || (navigationData == 'number')) {
              resolve(true)
            } else {
              if (isAuthenticated) {     
                role = JSON.parse(data.isAuthenticated.split('**')[1]) 
                switch (role) {
                  case Role.ADMIN:
                    this.router.navigate(['/admin'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.MEMBER:
                    this.router.navigate(['/member'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.GUEST:
                    resolve(false)
                    this.router.navigate(['/guest'], {
                      state: { data: Role.HOME },
                    })
                    break
                }
              } else {
                resolve(true)
              }
            }
          break;
      
  
          case Role.LOGIN:
            if ((navigationData == 'string') || (navigationData == 'number')) {
              resolve(true)
            } else {
              if (isAuthenticated) {
                role = JSON.parse(data.isAuthenticated.split('**')[1])       
                switch (role) {
                  case Role.ADMIN:
                    this.router.navigate(['/admin'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.MEMBER:
                    this.router.navigate(['/member'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.GUEST:
                    this.router.navigate(['/guest'], {
                      state: { data: Role.HOME },
                    })
                    break
                }
              } else {
                resolve(true)
              }
            }
          break;
  
  
            case Role.ADMIN:
            case Role.MEMBER:
            case Role.GUEST:
            if ((navigationData == 'string') || (navigationData == 'number')) {
              resolve(true)
            } else {
              if (isAuthenticated) { 
                role = JSON.parse(data.isAuthenticated.split('**')[1])     
                switch (role) {
                  case Role.ADMIN:
                    this.router.navigate(['/admin'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.MEMBER:
                    this.router.navigate(['/member'], {
                      state: { data: Role.HOME },
                    })
                    break
        
                  case Role.GUEST:
                    this.router.navigate(['/guest'], {
                      state: { data: Role.HOME },
                    })
                    break
                }
              } else {
                resolve(false)
                this.router.navigate(['/home'], {
                  state: { data: Role.HOME },
                })
              }
            }
  
          break;
      }

      
    })


  }

  canActivate(
    ntext: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let webSiteIsOpened = true
      let navigationData = this.router.getCurrentNavigation().extras?.state?.data
      let gardRole = ntext.data[0]



      if (webSiteIsOpened) {
        await this.isRouted(navigationData, resolve, gardRole)
      } else {
        if (gardRole == Role.COMING_SOON) {
          resolve(true)
        } else {
          resolve(false)
          this.router.navigate(['/coming-soon'])
        }
      }
    })
  }



  ngOnDestroy() {
    console.log('ngOnDestroy ngOnDestroy ngOnDestroy')
    this.observer.unsubscribe();
  }

}
