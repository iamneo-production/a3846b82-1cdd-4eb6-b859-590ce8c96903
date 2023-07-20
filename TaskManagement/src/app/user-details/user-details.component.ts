import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/data/userservice.service';

export class User{
  constructor(
    public id:number,
    public username: string,
    public email :string,
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
  message: string | undefined;
  users: User[] | undefined;

  constructor(public router: Router, private userservice: UserserviceService) {}

  ngOnInit(): void {
    this.refreshUsers();
  }
  sortUsersById() {
    this.users.sort((a, b) => a.id - b.id);
  }
  refreshUsers() {
    this.userservice.retrieveUsers().subscribe((response) => {
      console.log(response);
      this.users = response;
      this.sortUsersById();
    });
  }

  DeleteUser(id: any) {
    console.log(`delete Todo ${id}`);
    this.userservice.deleteUser(id).subscribe((response) => {
      console.log(response);
      this.message = `Deletion of User with ID ${id} successful`;
      this.refreshUsers();
    });
  }

  GoToTask(id: any) {
    // You can implement the logic for navigating to the task page here if needed
  }

  UpdateUser(id: any) {
    this.router.navigate(['users', { id: id }]);
  }

  addUser() {
    this.router.navigate(['users', { id: -1 }]);
  }
}
