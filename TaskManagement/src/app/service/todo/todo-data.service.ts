import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../service/task';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/app-constant';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http: HttpClient) { }
                            
  //private baseUrl: String = "https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io";

  retrieveAllTodos(userId){
    return this.http.get<Task[]>(`${API_URI}/tasks`)
  }
  deleteTodo(id:any){
    return this.http.delete(`${API_URI}/tasks/${id}`)
  }
  updateTask(id:number,task: Task){
    return this.http.put(`${API_URI}/tasks/${id}`, task)
  }
  getTaskById(id: number) {
    return this.http.get(`${API_URI}/tasks/${id}`);
  }
  createTask(task: Task) {
    return this.http.post(`${API_URI}/tasks`, task);
  }
}




















