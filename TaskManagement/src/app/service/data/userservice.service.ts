import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user-details/user-details.component';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/app-constant';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService{

  constructor(private http:HttpClient) {}
  retrieveUsers(){
    return this.http.get<User[]>(`${API_URI}/dusers`)
  }
  retrieveUserById(id:any){
    return this.http.get<User[]>(`${API_URI}/dusers/${id}`)
  }
  deleteUser(id:any){
    return this.http.delete(`${API_URI}/dusers/${id}`)
  }
  updateUser(id:any,user:any){
    return this.http.put(`${API_URI}/dusers/${id}`,user)
  }
  createUser(user:any) {
    return this.http.post(`${API_URI}/dusers`, user);
  }


  getUserImage(id: any): Observable<Blob> {
    const imageUrl = `${API_URI}/${id}/image`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  updateUserImage(id: any, formData: FormData): Observable<any> {
    return this.http.put(`${API_URI}/${id}/image/edit`, formData);
  }

  deleteUserImage(id: any): Observable<any> {
    const url = `${API_URI}/${id}/delete/image`;
    return this.http.delete(url);
  }
}
