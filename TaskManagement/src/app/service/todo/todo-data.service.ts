import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/view-task/view-task.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http:HttpClient) {}

    retrieveAllTodos(username: any){
      return this.http.get<Todo[]>(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/view-task`);
     }

     deleteTodo(username: any , id: any){
      return this.http.delete(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/${username}/view-task/${id}`);
    }

    updateTodo(username: any , id: any,todo: any){
      return this.http.put(
        `https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/${username}/view-task/${id}`,todo) ; 
      }
      
}
