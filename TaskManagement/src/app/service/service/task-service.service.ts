import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private baseUrl : String = "https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/tasks";

  constructor(private httpClient: HttpClient) { }

  createTask(task: Task): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, task);
  }

  getTaskById(id: number){
    return this.httpClient.get<Task>(`${this.baseUrl}/${id}`);
  }

  updateTask(id:number, task:Task): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, task);
  }

}
//INSERT INTO tasks (task_name, task_description, task_status, due_date, created_date)
//VALUES ('Task Name', 'Task Description', 'IN_PROGRESS', '2023-07-25', '2023-07-24');
