import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/task-details/task-details.component';
import { API_URI } from 'src/app/app-constant';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(public http: HttpClient) { }

  retrieveTasks() {
    return this.http.get<Task[]>(`${API_URI}/tasks`);
  }

  retrieveTaskById(id: any) {
    return this.http.get<Task[]>(`${API_URI}/tasks/${id}`);
  }

  deleteTask(id: any) {
    return this.http.delete(`${API_URI}/${id}`);
  }

  getCompletedTaskCount(): Observable<number> {
    return this.http.get<number>(`${API_URI}/completed-count`);
  }

  getTodoTaskCount(): Observable<number> {
    return this.http.get<number>(`${API_URI}/todo-count`);
  }

  getInProgressTaskCount(): Observable<number> {
    return this.http.get<number>(`${API_URI}/inprogress-count`);
  }

  getDoneTaskCount(): Observable<number> {
    return this.http.get<number>(`${API_URI}/done-count`);
  }
}
