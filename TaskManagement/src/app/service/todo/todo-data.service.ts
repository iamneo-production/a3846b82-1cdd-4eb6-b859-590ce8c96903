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
                            
  //private baseUrl: String = "https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io";

  retrieveAllTodos(userId){
    return this.http.get<Task[]>(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks`)
  }
  deleteTodo(id:any){
    return this.http.delete(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks/${id}`)
  }
  updateTask(id:number,task: Task){
    return this.http.put(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks/${id}`, task)
  }
  getTaskById(id: number) {
    return this.http.get(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks/${id}`);
  }
  createTask(task: Task) {
    return this.http.post(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks`, task);
  }
}




















