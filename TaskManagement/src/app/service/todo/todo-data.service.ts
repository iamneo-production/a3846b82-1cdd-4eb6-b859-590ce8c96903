import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../service/task';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http: HttpClient) { }
  private baseUrl: String = "https://8080-fcbffbbeecddfcfdedeaeaadbdbabf.project.examly.io";

  retrieveAllTodos(userId) {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  deleteTodo(id: any) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }
 
  getTaskById(id: number) {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  updateTask(id: number, task: Task): Observable<Object> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

}

