import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/data/userservice.service';
import { Role } from '../service/task/role';
import { CoreService } from '../core/core.service';

export class User{
  constructor(
    public id:number,
    public name: string,
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
  sortField: string = 'id'; // Default sort field is 'id'
  sortDirection: number = 1; // 1 for ascending, -1 for descending

  // Filtering
  filterRole: string = ''; // Default filter role is empty

  // Searching
  searchText: string = ''; // Default search text is empty
redirect: any;
  constructor(public router: Router, private userservice: UserserviceService, public _coreService: CoreService,) {}
  Roles = Object.values(Role);
  ngOnInit(): void {
    this.refreshUsers();

  }
  sortUsersById() {
    this.users.sort((a, b) => a.id - b.id);
  }
  refreshUsers() {
    this.userservice.retrieveUsers().subscribe((response) => {
      console.log(response);

      // Sort Users
      response.sort((a, b) => {
        const fieldValueA = a[this.sortField];
        const fieldValueB = b[this.sortField];
        return this.sortDirection * (fieldValueA < fieldValueB ? -1 : fieldValueA > fieldValueB ? 1 : 0);
      });
      
      // Assign IDs in ascending order starting from 1
      this.users = response.map((user, index) => {
        return { ...user, id: index + 1 };
      });


      // Filter Users
      if (this.filterRole) {
        this.users = response.filter((user) => user.role === this.filterRole);
      } else {
        this.users = response;
      }

      // Search Users
      if (this.searchText) {
        this.users = this.users.filter((user) =>
          Object.values(user).some((fieldValue) => fieldValue.toString().toLowerCase().includes(this.searchText.toLowerCase()))
        );
      }

    });
  }
  DeleteUser(id: any) {
    console.log(`delete User ${id}`);
    this.userservice.deleteUser(id).subscribe((response) => {
      console.log(response);
      this.message = `Deletion of User with ID ${id} successful`;
      this._coreService.openSnackBar('User Deleted!!','done');
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