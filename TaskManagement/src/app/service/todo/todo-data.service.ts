import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../service/task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http: HttpClient) { }

  private baseUrl: String = "https://8080-fcbffbbeecddfcfdedeaeaadbdbabf.project.examly.io/tasks";

  retrieveAllTodos() {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }
  deleteTodo(id: any) {
    return this.http.delete(`${this.baseUrl}`);
  }

  createTask(task: Task): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, task);
  }
 
  getTaskById(id: number) {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  updateTask(id: number, task: Task): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }
}

