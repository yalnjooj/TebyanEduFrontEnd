import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/gared/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogSingoutComponent } from 'src/app/dialogs/singout/dialogSingout/dialog.singout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  user: Object = {
    id: String,
    role: String,
    email: String
  }


  constructor(private dialog: MatDialog, private router: Router, private authS: AuthService, private ngxSpinnerService: NgxSpinnerService) { }
  
  timeNow;
  dateNow;
  time0 = setInterval(() => {
   this.timeNow = new Date().toLocaleTimeString();
   this.dateNow = new Date().toLocaleDateString();
     }, 1000);


  ngOnInit(): void {


    this.ngxSpinnerService.show();

    this.authS.isAuthenticate().subscribe(data => {
      this.user['id'] = data['id'];
      this.user['role'] = data['roles'];
      this.user['email'] = data['email'];

      this.ngxSpinnerService.hide();
    });



  }



  logout() {
    let f = this.dialog.open(DialogSingoutComponent,{
      width: '500px'
    })

    f.afterClosed().subscribe(data => {

      if (data) {
        this.authS.logout().subscribe((data) => {
          if (data.status == 200) this.router.navigate(['/']);
        })
      }

    })



  }




}
