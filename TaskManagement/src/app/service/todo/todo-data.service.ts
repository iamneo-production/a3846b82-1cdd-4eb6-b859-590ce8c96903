import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/view-task/view-task.component';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http:HttpClient) {}

  retrieveAllTodos(){

    return this.http.get<Todo[]>(`https://8080-bccadfbfbabceddbdfcfdedeaeaadbdbabf.project.examly.io/viewtask`);
  
   }
   deleteTodo(taskname: any , id: any){
    return this.http.delete(`https://8080-bccadfbfbabceddbdfcfdedeaeaadbdbabf.project.examly.io/${taskname}/viewtask/${id}`);
  }

  updateTodo(taskname: any , id: any,todo: any){
    return this.http.put(
      `https://8080-bccadfbfbabceddbdfcfdedeaeaadbdbabf.project.examly.io/${taskname}/viewtask/${id}`,todo) ; 
    }
}

