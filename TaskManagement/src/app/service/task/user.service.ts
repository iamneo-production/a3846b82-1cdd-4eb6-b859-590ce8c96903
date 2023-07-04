import { Injectable } from '@angular/core';
import { User } from './user';
import { USER } from './user-data';
import { userList } from './user-list';
import { users } from './user-list-data';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserDetails():User[]{
    return USER;
  }

  getFriendList():userList[]{
    return users;
  }
  
}
