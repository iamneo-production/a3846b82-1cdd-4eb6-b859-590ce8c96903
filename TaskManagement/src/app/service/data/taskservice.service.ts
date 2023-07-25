import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/task-details/task-details.component';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(public http:HttpClient) { }

  retrieveTasks(){
    return this.http.get<Task[]>(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks`)
  }
  retrieveTaskById(id:any){
    return this.http.get<Task[]>(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks/${id}`)
  }
  deleteTask(id:any){
    return this.http.delete(`https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io/tasks/${id}`)
  }
}