import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService{

  constructor(private http:HttpClient) {}

  retrieveUsers(){
    return this.http.get<User[]>(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers`)
  }
  deleteUser(username:any,id:any){
    return this.http.delete(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers/${id}`)
  }
}