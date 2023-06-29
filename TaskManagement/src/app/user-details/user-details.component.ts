import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/data/userservice.service';
export class User{
  constructor(
    public id:number,
    public username: string,
    public email :string,
    public isdone:boolean,
    public role:string,
  ){
    
  }
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  message:string | undefined;
  constructor(public router:Router,private userservice:UserserviceService){

  }
  ngOnInit(): void {
    this.refreshUsers()
  }
  refreshUsers(){
    this.userservice.retrieveUsers().subscribe(
      response=>{
        console.log(response)
        this.users=response
      }
    )
  }
  users:User[] | undefined
  // Users=[new User(1,'sandeep','abc@gmail.com','software_developer'),
  // new User(2,'revanth','bac@gmail.com','software_developer'),
  // new User(3,'ravi','cab@gmail.com','software_developer')];
  DeleteUser(id:any){
    console.log(`delete Todo ${id}`)
    this.userservice.deleteUser('sandeep',id).subscribe(
      response=>{
        console.log(response);
        this.message=`Deletion of User with ID ${id} successful`
        this.refreshUsers()
      }
    )
  }
  GoToTask(id:any){

  }
  UpdateUser(id:any){
    this.router.navigate(['users'])
  }
}