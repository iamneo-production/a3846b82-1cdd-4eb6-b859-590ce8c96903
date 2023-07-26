import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { API_URI } from 'src/app/app-constant';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {


  constructor(private httpClient: HttpClient) { }

  createTask(task: Task): Observable<Object> {
    return this.httpClient.post(`${API_URI}`, task);
  }

  getTaskById(id: number){
    return this.httpClient.get<Task>(`${API_URI}/${id}`);
  }

  updateTask(id:number, task:Task): Observable<Object>{
    return this.httpClient.put(`${API_URI}/${id}`, task);
  }

}
//INSERT INTO tasks (task_name, task_description, task_status, due_date, created_date)
//VALUES ('Task Name', 'Task Description', 'IN_PROGRESS', '2023-07-25', '2023-07-24');
