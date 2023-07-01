import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService{

  constructor(private http:HttpClient) {}

  retrieveUsers(){
    return this.http.get<User[]>(`http://localhost:8080/dusers`)
  }
  deleteUser(username:any,id:any){
    return this.http.delete(`http://localhost:8080/${username}/dusers/${id}`)
  }
}