import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {

  private taskData: any;

  private userData: any;

  addTaskData(task: any) {
    this.taskData = task;  }

  getTaskData() {
    return this.taskData;
  }
  addUserData(user: any) {
    this.userData = user;  }

  getUserData() {
    return this.userData;
  }

}
