import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/task-details/task-details.component';
@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(public http:HttpClient) { }

  retrieveTasks(){
    return this.http.get<Task[]>(`https://8080-bccadfbfbabceddbdfcfdedeaeaadbdbabf.project.examly.io/dtasks`)
  }
}