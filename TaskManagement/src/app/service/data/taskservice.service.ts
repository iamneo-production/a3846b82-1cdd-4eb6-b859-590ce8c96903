import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/task-details/task-details.component';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(public http: HttpClient) { }

  retrieveTasks() {
    return this.http.get<Task[]>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/dtasks`);
  }

  retrieveTaskById(id: any) {
    return this.http.get<Task[]>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/dtasks/${id}`);
  }

  deleteTask(id: any) {
    return this.http.delete(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/dtasks/${id}`);
  }

  getCompletedTaskCount(): Observable<number> {
    return this.http.get<number>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/completed-count`);
  }

  getTodoTaskCount(): Observable<number> {
    return this.http.get<number>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/todo-count`);
  }

  getInProgressTaskCount(): Observable<number> {
    return this.http.get<number>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/inprogress-count`);
  }

  getDoneTaskCount(): Observable<number> {
    return this.http.get<number>(`https://8080-aacbaafcfdedeaeaadbdbabf.project.examly.io/done-count`);
  }
}
