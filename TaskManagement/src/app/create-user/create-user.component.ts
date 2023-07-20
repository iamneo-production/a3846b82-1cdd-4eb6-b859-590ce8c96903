import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../service/task/user';
import { Role} from '../service/task/role';
import { UserserviceService } from '../service/data/userservice.service';
import { Status } from '../service/task/Status';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // user
  user: User = new User();

  // Validations
  createUser = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
    role: new FormControl('', [Validators.required]),
    isdone:new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Add more fields as needed, e.g., password, etc.
  });

  constructor(
    private location: Location,
    private router: Router,
    private userService:UserserviceService  // Inject your UserService here
  ) { }

  ngOnInit(): void {
  }

  get username() {
    return this.createUser.get('username');
  }
  get isdone(){
    return this.createUser.get('isdone');
  }
  get roles() {
    return this.createUser.get('roles');
  }

  get email() {
    return this.createUser.get('email');
  }

  // Done button method
  onSubmit() {
    if (this.createUser.valid) {
      const userDetails: User = {
        username: this.createUser.value.username as string,
        isdone: this.createUser.value.isdone as Status,
        role: this.createUser.value.role as Role,
        email: this.createUser.value.email as string,
        id: 0,
        password: ''
      };
      console.log(userDetails);
      this.userService.createUser(this.user)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['userdetails']); // Navigate to the user list or any other page as needed
        });
    }
  }
  Roles = Object.values(Role);
  Status=Object.values(Status);

  // Reset button method
  onReset() {
    this.createUser.reset();
  }

  // Cancel button method
  onCancel() {
    this.location.back();
  }
  onAssignUser() {
    if (this.createUser.valid) {

      //Task data
      const userDetails: User = {
        username: this.createUser.value.username as string,
        isdone: this.createUser.value.isdone as Status,
        email: this.createUser.value.email as string,
        role: this.createUser.value.role as Role,
        id: null,
        password: ''
      };
  
      //getting task by id
      this.userService.createUser(userDetails)
        .subscribe(data => {
          console.log(data);

          //Get the task by id
          //navigate to assign task by getting the id
          const userId=(data as User).id;
          this.router.navigate(['users',userId,'userdetails']); 
        


         
        });
    } 
  }
}
