import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'https://8080-ebfbfabcfcfdedeaeaadbdbabf.project.examly.io';

  constructor(private http: HttpClient) { }

  getUserDetails(userId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getUserImage(userId: any): Observable<Blob> {
    const imageUrl = `${this.apiUrl}/${userId}/image`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  updateUserDetails(userId: any, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${userId}`, formData);
  }

  /*deleteUserImage(userId: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${userId}/image`;
    return this.http.delete(url);
  }*/

  
}
