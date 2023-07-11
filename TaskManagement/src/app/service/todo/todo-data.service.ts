import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/view-task/view-task.component';
import { TODO_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    public http:HttpClient) {}

  retrieveAllTodos(){

    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/view-task`);
  
   }

   
  retriveTodo(taskName: any , id: any){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/${taskName}/view-task/${id}`);
  }

  deleteTodo(taskName: any , id: any){
    return this.http.delete(`${TODO_JPA_API_URL}/${taskName}/view-task/${id}`);
  }

  updateTodo(taskName: any , id: any,todo: any){
    return this.http.put(
      `${TODO_JPA_API_URL}/${taskName}/view-task/${id}`,todo) ; 
    }

    createTodo(taskName: any , todo:any){
      return this.http.post(`${TODO_JPA_API_URL}/${taskName}/view-task` , todo);
    }

}
