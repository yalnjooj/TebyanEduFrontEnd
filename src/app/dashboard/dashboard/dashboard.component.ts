import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/gared/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user: Object = {
  id: String,
  role: String,
  email: String
}
  constructor(private router: Router, private authS: AuthService,  private ngxSpinnerService: NgxSpinnerService) { }



  ngOnInit(): void {
    this.ngxSpinnerService.show();

   this.authS.isAuthenticate().subscribe(data =>{
    this.user['id'] = data['id'];
    this.user['role'] = data['roles'];
    this.user['email'] = data['email'];

    this.ngxSpinnerService.hide();
  });

  

  }


    logout(){
         this.authS.logout().subscribe((data)=>{
           localStorage.clear();
            if (data.status == 200) this.router.navigate(['/']);
      })
    }

}
