import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/service/user.service';
import { UserAuthService } from '../service/service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formdata = { name: "", password: "" };

  constructor(private userService:UserService,
    private usertAuth:UserAuthService,
    private router:Router
    ){

  }

  ngOnInit(): void {
      
  }

  signUp(){
    this.router.navigate(['/signup']);


  }
 
  onSubmit(form:any){
    this.userService.login(form.value).subscribe(
      (response:any)=>{
        //console.log(response);
       // console.log(response.role);
      //  console.log(response.access_token);

        this.usertAuth.setRoles(response.role);
        this.usertAuth.setToken(response.access_token);
        this.usertAuth.setUserId(response.userId);
        

        //roles based auth
        let role: string = response.role;

        if(role==='ADMIN'){
          this.router.navigate(['/adminDashboard']);
        }
      /*else if(role==='TEAMLEADER'){
          this.router.navigate(['/dashboard']);
        }*/
        else{
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

}
