import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formdata = {name:"",password:""};
  submit=false;

  constructor(){}

  ngOnInit(): void {

  }
  onSubmit(){
    console.log(this.formdata);

  }

}
