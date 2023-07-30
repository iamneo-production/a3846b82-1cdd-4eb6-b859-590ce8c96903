import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
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
    name: new FormControl('', [Validators.required, Validators.pattern(/\S/g)]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Add more fields as needed, e.g., password, etc.
  });

  constructor(
    private location: Location,
    private router: Router,
    private userService:UserserviceService,
    private route:ActivatedRoute  // Inject your UserService here
  ) { }

  ngOnInit(): void {
    const userIdFromRoute = this.route.snapshot.paramMap.get('id');

  if (userIdFromRoute) {
    // Updating an existing user
    this.userService.retrieveUserById(userIdFromRoute).subscribe(
      (user:any) => {
        this.user = user;
        // Prepopulate the form with the user details
        this.createUser.patchValue({
          name: user.name,
          role: user.role,
          email: user.email
        });
      },
      (error: any) => {
        console.log(error);
        // Handle error (e.g., show an error message or navigate back)
        this.router.navigate(['userdetails']);
      }
    );
  }
  }

  get name() {
    return this.createUser.get('username');
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
        name: this.createUser.value.name as string,
        role: this.createUser.value.role as Role,
        email: this.createUser.value.email as string,
        id: this.user.id || 0,
        password: ''
      };
  
      console.log(userDetails);
  
      if (this.user.id) {
        // Updating an existing user
        this.userService.updateUser(this.user.id,userDetails).subscribe((data: User) => {
          console.log(data);
          this.router.navigate(['adminDashboard']); // Corrected route to the user board page
        });
      } else {
        // Creating a new user
        this.userService.createUser(userDetails).subscribe((data: User) => {
          console.log(data);
          this.router.navigate(['adminDashboard']); // Corrected route to the user board page
        });
        this.createUser.reset(
          
        );
      }
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

}