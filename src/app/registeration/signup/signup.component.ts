import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private  authS: AuthService) {

  }

  ngOnInit(): void {
  }


  signUp(email, pass, pass2, role){
console.log("From: "+ role.value)
    if(!email.value || !pass.value || !pass2.value || !role.value){
      let mass1 = 'Fell The filds !!';
      console.log(mass1)
    }

    else if(pass.value !== pass2.value){
      let mass2 = 'Passwords Dose Not Match !!';
      console.log(mass2)
    }

    else {

      this.authS.signUp(email.value, pass.value, role.value).subscribe((data)=>{
        let mass3 = 'From Server: ' + data;
        console.log(data)
      })
    }


  }

}
