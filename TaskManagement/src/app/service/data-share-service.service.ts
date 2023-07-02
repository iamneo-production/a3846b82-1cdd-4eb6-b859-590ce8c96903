import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {

  private data: any;

  addTaskData(data: any) {
    this.data = data;
  }

  getTaskData() {
    return this.data;
  }
}
