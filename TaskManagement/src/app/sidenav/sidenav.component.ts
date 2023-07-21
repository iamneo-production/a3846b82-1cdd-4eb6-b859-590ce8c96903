import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/service/user-auth.service';
import { UserService } from '../service/service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private userAuth: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {

  }
  ngOnInit(): void {

  }

  public logout() {
    const confirmation = confirm("Do you want to logout?");
    if (confirmation) {
      this.userAuth.clear();
      this.router.navigate(['']);
    }
  }


  //to show and hide login/logout buttons
  public isLoggedIn() {
    return this.userAuth.isLoggedIn();
  }
}
