import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private  authS: AuthService, private router: Router,  private ngxSpinnerService: NgxSpinnerService) {}
siteLink = location.href.split(`${location.origin}/resetPassword/`)[1]
  ngOnInit(): void {
    this.resetPassGet(this.siteLink)
  }

  resetPassGet(link){
    this.ngxSpinnerService.show();
    this.authS.resetPassGet(link).subscribe((data)=>{
      if(data['status'] == 400){
        this.ngxSpinnerService.hide();
        {data['message']}
        this.router.navigate(['/'])
      }
    })

  }

  resetPassPost(pass, pass2) {
    if(!pass.value || !pass2.value) {'إملئ الفراغ !'}
    if(pass.value != pass2.value){
      {'كلمة المرور غير متطابقة !'}

    } else {
      this.ngxSpinnerService.show();
      this.authS.resetPassPost(pass.value, this.siteLink).subscribe((data)=>{
        if (data['status'] == 400) {
          this.ngxSpinnerService.hide();
          {html: data['message']}
          this.router.navigate(['/']); return
        }

        if (data.status == 200) {
          this.ngxSpinnerService.hide();
          {html: data.body['message']}
          this.router.navigate(['/login']);
        }

      })
    }
  }


}
