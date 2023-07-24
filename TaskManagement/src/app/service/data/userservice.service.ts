import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user-details/user-details.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService{

  constructor(private http:HttpClient) {}
  retrieveUsers(){
    return this.http.get<User[]>(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers`)
  }
  retrieveUserById(id:any){
    return this.http.get<User[]>(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers/${id}`)
  }
  deleteUser(id:any){
    return this.http.delete(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers/${id}`)
  }
  updateUser(id:any,user:any){
    return this.http.put(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers/${id}`,user)
  }
  createUser(user:any) {
    return this.http.post(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers`, user);
  }
}