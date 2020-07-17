import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private  authS: AuthService, private router: Router,  private ngxSpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
  }


  logIn(email, pass){

    if(!email.value || !pass.value){
      'حقل فارغ !'
    }

    else {
      this.ngxSpinnerService.show();
      this.authS.logIn(email.value, pass.value).subscribe((data)=>{
  
        if (data.body['statu'] == 200){   
          this.router.navigate(['/dashboard']);
          return
        }
    
        if (data.body['statu'] == 400) data.body['message']
    
        this.ngxSpinnerService.hide();
    
      })
    

    }

  }




  ngAfterViewInit(){
    // var toastHTML = `<a class="btn" onclick="M.toast({html: 'I am a toast', completeCallback: function(){alert('Your toast was dismissed')}})">Toast!</a>`;
    // M.toast({html: toastHTML});
  }




}
