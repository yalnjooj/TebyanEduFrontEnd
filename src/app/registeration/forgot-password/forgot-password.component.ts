import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private  authS: AuthService,  private router: Router,  private ngxSpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
  }

  forgotPassword(email){
    if(!email.value) 'إملئ الفراغ !'

 this.ngxSpinnerService.show();
    this.authS.forgotPassword(email.value, location.origin).subscribe((data)=>{

      if(data.body['status'] == 400){
        this.ngxSpinnerService.hide();
        {html: data.body['message']}
      }

      if(data.body['status'] == 200){
        this.ngxSpinnerService.hide();
        {html: data.body['message']}
          this.router.navigate(['/'])

      }
    })

  }

}
