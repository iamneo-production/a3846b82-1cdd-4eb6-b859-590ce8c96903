import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {

  private taskData: any;

  addTaskData(task: any) {
    this.taskData = task;  }

  getTaskData() {
    return this.taskData;
  }

}
